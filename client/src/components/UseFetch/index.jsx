import React, { useEffect, useState } from 'react';

export default function useFetch(url, options = {}) {
  //3 states
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setPending(true);
      const response = await fetch(url, { ...options });
      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();
      setData(result);
      setError(null);
      setPending(false);
    } catch (error) {
      setError(`${error}. Some error ocurred`);
      setPending(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, pending };
}
