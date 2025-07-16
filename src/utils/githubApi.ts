export async function searchUsers(query: string) {
  const res = await fetch(
    `https://api.github.com/search/users?q=${query}&per_page=5`
  );
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  return data.items;
}

export async function getRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}
