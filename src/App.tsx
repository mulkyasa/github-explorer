import { useState } from 'react';
import SearchInput from './components/SearchInput';
import UserCard from './components/UserCard';
import type { GithubUser } from './types/github';

export default function App() {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async (q: string) => {
    setQuery(q);
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${q}&per_page=5`
      );
      const data = await res.json();
      setUsers(data.items || []);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-xl mx-auto space-y-6">
        <SearchInput onSearch={handleSearch} loading={loading} />

        {query && users.length > 0 && (
          <p className="text-sm text-gray-600">
            Showing users for "<span className="font-medium">{query}</span>"
          </p>
        )}

        <div className="space-y-4">
          {users.length === 0 && query && !loading ? (
            <p className="text-sm text-gray-500">
              No users found for "{query}".
            </p>
          ) : (
            users.map((user) => <UserCard key={user.id} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
}
