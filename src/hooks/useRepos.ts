import { useEffect, useState } from 'react';
import type { GithubRepo } from '../types/github';

export function useRepos(username: string) {
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setError('');
      })
      .catch((err) => {
        setError('Failed to load repos');
        setRepos(null);
      })
      .finally(() => setLoading(false));
  }, [username]);

  return { repos, loading, error };
}
