import { getGithubProfile } from '../utils/github.js';
import { generateAscii } from '../utils/imageToAscii.js';
import { renderSvg } from '../utils/renderer.js';

export default async function handler(req, res) {
  const { username, theme = 'default', image_url } = req.query;

  if (!username) {
    return res.status(400).send('Missing required query: username');
  }

  try {
    const user = await getGithubProfile(username);
    const asciiArt = await generateAscii(image_url || user.avatar_url);
    
    // Call function to render SVG
    const svgOutput = renderSvg(asciiArt, user, { theme });

    // Define imagem type to SVG
    res.setHeader('Content-Type', 'image/svg+xml');
    // Add cache for better performance and avoid hitting API limits
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    res.status(200).send(svgOutput);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}