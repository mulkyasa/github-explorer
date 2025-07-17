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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full"
    >
      <label htmlFor="search-input" className="sr-only">
        Search GitHub username
      </label>
      <input
        id="search-input"
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter username"
        className="w-full sm:flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span>Searching...</span>
          </div>
        ) : (
          'Search'
        )}
      </button>
    </form>
  );
}
