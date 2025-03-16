import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
      .then(res =>{
        if(!res.ok){
          throw Error('Could not fetch the data for that resource')
        }
        if(!res.json()){
          throw Error('No data available')
        }
        data(res.json())
      })
      .catch (err=> setError(err))
      .finally(()=> setLoading(false))
    }
    fetchData();
  }, [url])

  const refetch =async () => {
    await fetch(url)
    .then(res => setData(res.json()))
    .catch (err=> setError(err))
    .finally(()=> setLoading(false))
    }

  return () => {
    data, loading, error,refetch
  }
}

export default useFetch