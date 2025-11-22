import { getGithubProfile } from '../utils/github.js';
import { generateAscii } from '../utils/imageToAscii.js';
import { renderSvg } from '../utils/renderer.js';

export default async function handler(req, res) {
  const {
    username,
    theme = 'default',
    image_url,
    country,
    state,
    since,
    timezone,
    portfolio,
    distros,
    like,
    role,
  } = req.query;

  if (!username) {
    return res.status(400).send('Missing required query: username');
  }

  try {
    const user = await getGithubProfile(username);
    
    const asciiData = await generateAscii(image_url || user.avatar_url);

    const customData = {
      country,
      state,
      since,
      timezone,
      portfolio,
      distros,
      like,
      role,
    };

    const svgOutput = renderSvg(asciiData, user, customData, { theme });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=14400');
    
    res.status(200).send(svgOutput);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}