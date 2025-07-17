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
    <div className="border rounded-lg p-4 bg-gray-100 shadow-sm w-full max-w-xl mx-auto transition-shadow hover:shadow-md">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md cursor-pointer"
        aria-expanded={open}
        aria-controls={`repo-section-${user.login}`}
      >
        <span className="font-semibold text-sm sm:text-base break-words">
          {user.login}
        </span>
        <span className="text-xl">{open ? '▾' : '▸'}</span>
      </button>

      <div
        id={`repo-section-${user.login}`}
        className={`space-y-3 transition-all duration-300 ease-in-out overflow-hidden overflow-y-auto ${
          open ? 'mt-3 max-h-[1000px]' : 'max-h-0'
        }`}
      >
        {open && (
          <>
            {loading && (
              <div className="text-sm text-gray-500 animate-pulse">
                Loading...
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {!loading &&
              repos &&
              repos.length > 0 &&
              repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}

            {!loading && repos && repos.length === 0 && !error && (
              <p className="text-sm text-gray-500">No repositories found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
