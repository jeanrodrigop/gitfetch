import asciify from 'asciify-image';
// Function to convert an image URL to ASCII art
export async function generateAscii(imageUrl) {
  const options = {
    fit: 'box',
    width: 35,
    height: 20,
    color: false, 
  };

  return await asciify(imageUrl, options);
}
