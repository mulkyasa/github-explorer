import { useState } from 'react';

type Props = {
  onSearch: (query: string) => void;
  loading?: boolean;
};

export default function SearchInput({ onSearch, loading }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter username"
        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
