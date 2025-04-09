// Custom Hook for Fetching Data in React
// This hook provides a way to fetch data from an API or any asynchronous source.

import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };  

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  
  return { data, loading, error, fetchData, reset };
};

export default useFetch;

// Example of a fetch function
// const fetchMovies = async ({ query }: { query: string }) => {
//   const response = await fetch(`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, {
//     method: "GET",
//     headers: TMDB_CONFIG.headers,
//   });

//   if (!response.ok) {
//     throw (new Error("Failed to fetch movies"), response.statusText);
//   }

//   const data = await response.json();
//   return data.results;   
// };

// Example usage of the useFetch hook
// const { data, loading, error, fetchData } = useFetch(() => fetchMovies({ query: "Inception" }));
//
// useEffect(() => {
//   fetchData();
// }, []);

// if (loading) {
//   return <div>Loading...</div>;
// }

// if (error) {
//   return <div>Error: {error}</div>;
// }

// return (
//   <div>
//     {data && data.map((movie) => (
//       <div key={movie.id}>
//         <h2>{movie.title}</h2>
//         <p>{movie.overview}</p>
//       </div>
//     ))}
//   </div> 
// );