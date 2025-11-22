import jimp from 'jimp';

export async function generateAscii(imageUrl) {
  try {
    const image = await jimp.read(imageUrl);
    
    const width = 40;
    const height = width * (image.bitmap.height / image.bitmap.width) * 0.55; 

    image.resize(width, height);

    const asciiData = [];
    const chars = '@%#*+=-:. '; 

    for (let y = 0; y < image.bitmap.height; y++) {
      const row = [];
      for (let x = 0; x < image.bitmap.width; x++) {
        const pixelColor = jimp.intToRGBA(image.getPixelColor(x, y));
        
        if (pixelColor.a < 128) {
          row.push({ char: ' ', color: null });
          continue;
        }

        const brightness = (0.299 * pixelColor.r + 0.587 * pixelColor.g + 0.114 * pixelColor.b) / 255;

        const charIndex = Math.floor((1 - brightness) * (chars.length - 1));
        const safeIndex = Math.max(0, Math.min(charIndex, chars.length - 1));
        const char = chars[safeIndex];

        const hex = '#' + ((1 << 24) + (pixelColor.r << 16) + (pixelColor.g << 8) + pixelColor.b).toString(16).slice(1);
        
        row.push({ char, color: hex });
      }
      asciiData.push(row);
    }

    return asciiData;
  } catch (error) {
    console.error('Erro ao gerar ASCII:', error);
    return [];
  }
}