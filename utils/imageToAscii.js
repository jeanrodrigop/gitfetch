import jimp from 'jimp';

export async function generateAscii(imageUrl) {
  try {
    const image = await jimp.read(imageUrl);
    
    const width = 45;
    const height = 45 * (image.bitmap.height / image.bitmap.width) * 0.55; 

    image.resize(width, height);

    const asciiData = [];
    const chars = ' .:-=+*#%@';

    for (let y = 0; y < image.bitmap.height; y++) {
      const row = [];
      for (let x = 0; x < image.bitmap.width; x++) {
        const pixelColor = jimp.intToRGBA(image.getPixelColor(x, y));
        
        if (pixelColor.a === 0) {
          row.push({ char: ' ', color: null });
          continue;
        }

        const brightness = ((pixelColor.r + pixelColor.g + pixelColor.b) / 3) / 255;
        const charIndex = Math.floor(brightness * (chars.length - 1));
        const char = chars[charIndex];

        const hex = '#' + ((1 << 24) + (pixelColor.r << 16) + (pixelColor.g << 8) + pixelColor.b).toString(16).slice(1);
        
        row.push({ char, color: hex });
      }
      asciiData.push(row);
    }

    return asciiData;
  } catch (error) {
    console.error('Erro ao gerar ASCII:', error);
    return [['Error generating ASCII']];
  }
}