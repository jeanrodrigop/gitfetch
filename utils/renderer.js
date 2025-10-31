const THEMES = {
  default: {
    bg: '#282a36',        
    text: '#f8f8f2',      
    label: '#50fa7b',     
    prompt: '#50fa7b',    
    separator: '#ffb86c', 
  },
  light: {
    bg: '#f8f8f2',
    text: '#282a36',
    label: '#ff79c6',
    prompt: '#ff79c6',
    separator: '#ff5555',
  }
};

const COLORS = [
  '#282a36', '#44475a', '#f8f8f2', '#6272a4', '#8be9fd', '#50fa7b', '#ffb86c', '#ff79c6',
  '#282a36', '#44475a', '#f8f8f2', '#6272a4', '#8be9fd', '#50fa7b', '#ffb86c', '#ff79c6'
];

function escapeXml(str) {
  if (str === null || str === undefined) {
    return 'N/A';
  }
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * @param {string} asciiArt
 * @param {object} user 
 * @param {object} customData
 * @param {object} options 
 */
export function renderSvg(asciiArt, user, customData = {}, options = {}) {
  const theme = THEMES[options.theme] || THEMES.default;

  const topPrompt = `
    <text x="20" y="35" class="prompt-text">
      <tspan fill="${theme.prompt}">${escapeXml(user.login)}@github</tspan>
      <tspan fill="${theme.text}">:~$ gitfetch</tspan>
    </text>
  `;

  const asciiLines = asciiArt.split('\n');
  const asciiElements = asciiLines.map((line, index) => 
    `<tspan x="20" y="${60 + (index * 15)}">${escapeXml(line).replace(/ /g, '&nbsp;')}</tspan>`
  ).join('');

  const info = [
    { label: 'Name', value: user.name || 'N/A' },
    { label: 'User', value: user.login },
    { label: 'Country', value: customData.country },
    { label: 'State', value: customData.state },
    { label: 'Since', value: customData.since || new Date(user.created_at).getFullYear() },
    { label: 'Timezone', value: customData.timezone },
    { label: 'Portfolio', value: customData.portfolio || user.blog },
    { label: 'Distros', value: customData.distros },
    { label: 'Like', value: customData.like },
    { label: 'Role', value: customData.role },
  ];

  const infoStartX = 380;
  const infoStartY = 60;
  const infoLineHeight = 22;

  const infoHeader = `
    <text x="${infoStartX}" y="${infoStartY}" class="info-header" fill="${theme.prompt}">
      ${escapeXml(user.login)}@github
    </text>
  `;
  
  const infoSeparator = `
    <text x="${infoStartX}" y="${infoStartY + 15}" class="info-separator" fill="${theme.separator}">
      -------------
    </text>
  `;

  const infoElements = info.map((item, index) => {
    const yPos = (infoStartY + 35) + (index * infoLineHeight); 
    
    if (item.value) {
      return `
        <text x="${infoStartX}" y="${yPos}" class="info-text">
          <tspan font-weight="bold" fill="${theme.label}">${item.label}:</tspan>
          <tspan fill="${theme.text}"> ${escapeXml(item.value)}</tspan>
        </text>
      `;
    }
    return '';
  }).join('');
  
  const colorRects = COLORS.map((color, index) => {
    const rectSize = 20;
    const spacing = 5;
    const row = index < 8 ? 0 : 1;
    const col = index % 8;

    const xPos = infoStartX + col * (rectSize + spacing);
    const yPos = (infoStartY + 35) + (info.length * infoLineHeight) + (row * (rectSize + spacing)) + 10;
    
    return `<rect x="${xPos}" y="${yPos}" width="${rectSize}" height="${rectSize}" fill="${color}" rx="3" ry="3" />`;
  }).join('');

  const bottomPrompt = `
    <text x="20" y="380" class="prompt-text">
      <tspan fill="${theme.prompt}">${escapeXml(user.login)}@github</tspan>
      <tspan fill="${theme.text}">:~$ </tspan>
    </text>
  `;

  return `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${theme.bg}" rx="10" ry="10"/>
      <style>
        /* Fontes: Monospace para ASCII e prompts, UI para o texto de info */
        .ascii-art { font-family: 'Monaco', 'Courier New', monospace; font-size: 12px; fill: ${theme.text}; white-space: pre; }
        .prompt-text { font-family: 'Monaco', 'Courier New', monospace; font-size: 14px; white-space: pre; }
        .info-header { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-size: 18px; font-weight: bold; }
        .info-separator { font-family: 'Monaco', 'Courier New', monospace; font-size: 14px; }
        .info-text { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-size: 16px; }
      </style>
      
      ${topPrompt}
      <text class="ascii-art">${asciiElements}</text>
      
      ${infoHeader}
      ${infoSeparator}
      ${infoElements}
      ${colorRects}
      
      ${bottomPrompt}
    </svg>
  `;
}