import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getUsers() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        console.log('Here');
        setUsers(data);
      } catch (err) {
        if (err?.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getUsers();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {loading && <h2>Loading...</h2>}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && JSON.stringify(users)}
    </div>
  );
}

export default App;
