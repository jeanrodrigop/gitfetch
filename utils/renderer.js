// Theme definitions for the SVG rendering
const THEMES = {
  default: {
    bg: '#282a36',
    text: '#f8f8f2',
    label: '#50fa7b',
    value: '#bd93f9',
  },
  light: {
    bg: '#f8f8f2',
    text: '#282a36',
    label: '#ff79c6',
    value: '#6272a4',
  }
};

// Function to escape XML special characters
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderSvg(asciiArt, user, options = {}) {
  // Select the theme based on options or default to 'default'
  const theme = THEMES[options.theme] || THEMES.default;

  // Format the ASCII art into SVG text elements
  const asciiLines = asciiArt.split('\n');
  const asciiElements = asciiLines.map((line) => 
    `<tspan x="20" dy="15">${escapeXml(line).replace(/ /g, '&nbsp;')}</tspan>`
  ).join('');

  // Define user information to be displayed in the SVG
  const info = [
    { label: 'Name', value: user.name || 'N/A' },
    { label: 'User', value: user.login },
    { label: 'Location', value: user.location || 'Unknown' },
    { label: 'Since', value: new Date(user.created_at).getFullYear() },
    { label: 'Repos', value: user.public_repos },
    { label: 'Followers', value: user.followers }
  ];
  
  const infoStartX = 340;
  const infoStartY = 65;
  const infoLineHeight = 25;

  // Create SVG text elements for user information
  const infoElements = info.map((item, index) => {
    const yPos = infoStartY + (index * infoLineHeight);
    return `
      <text x="${infoStartX}" y="${yPos}" class="info-text">
        <tspan font-weight="bold" fill="${theme.label}">${item.label}:</tspan>
        <tspan fill="${theme.value}"> ${escapeXml(item.value)}</tspan>
      </text>
    `;
  }).join('');
  
  const titleY = infoStartY - infoLineHeight;

  // Return the complete SVG string
  return `
    <svg width="700" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${theme.bg}" rx="10" ry="10"/>
      <style>
        .ascii-art { font-family: 'Monaco', 'Courier New', monospace; font-size: 12px; fill: ${theme.text}; white-space: pre; }
        .info-text { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-size: 18px; }
      </style>
      <text x="20" y="25" class="ascii-art">${asciiElements}</text>
      <text x="${infoStartX}" y="${titleY}" class="info-text">
        <tspan font-weight="bold" fill="${theme.label}">${escapeXml(user.login)}@github</tspan>
        <tspan fill="${theme.value}">-------</tspan>
      </text>
      ${infoElements}
    </svg>
  `;
}