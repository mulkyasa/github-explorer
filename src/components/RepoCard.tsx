import type { GithubRepo } from '../types/github';

type RepoCardProps = {
  repo: GithubRepo;
};

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="border p-3 rounded-md bg-gray-50">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{repo.name}</h3>
        <span className="text-sm text-yellow-600">
          ⭐ {repo.stargazers_count}
        </span>
      </div>
      {repo.description && (
        <p className="text-sm text-gray-600">{repo.description}</p>
      )}
    </div>
  );
}
