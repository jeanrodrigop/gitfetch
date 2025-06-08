import fetch from 'node-fetch';
// Declaration of the function to fetch GitHub user profile
export async function getGithubProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error('GitHub user not found');
  return res.json();
}