import React, { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Could not fetch the data for that resource");
        }
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [url]);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Could not fetch the data for that resource");
      }
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err); 
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useFetch;