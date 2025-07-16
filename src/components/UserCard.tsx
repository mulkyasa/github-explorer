import { useState } from 'react';
import type { GithubUser } from '../types/github';
import { useRepos } from '../hooks/useRepos';
import RepoCard from './RepoCard';

type Props = {
  user: GithubUser;
};

export default function UserCard({ user }: Props) {
  const [open, setOpen] = useState(false);
  const { repos, loading, error } = useRepos(open ? user.login : '');

  return (
    <div className="border rounded-md p-3 bg-white shadow">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left flex justify-between items-center"
      >
        <span className="font-semibold">{user.login}</span>
        <span className="text-xl">{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          {loading && <p className="text-gray-500">Loading repos...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            repos &&
            repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      )}
    </div>
  );
}
