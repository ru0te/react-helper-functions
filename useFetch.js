import { useEffect } from 'react';
import { useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const controller = new AbortController();

    setData(undefined);
    setError(undefined);
    setStatus('loading');

    async function fetchData() {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          const json = await res.json();
          return Promise.reject(json);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err);
        setStatus('error');
      } finally {
        setStatus('fetched');
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, status };
}
