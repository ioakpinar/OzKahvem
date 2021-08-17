import { useState, useEffect } from "react";

export function useTime() {
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:12345/gettime");
        if (!response.ok) {
          console.log("Hata döndü");
          // throw the error
          throw new Error(response.status);
        } else {
          const value = await response.json();
          setTime(value);
          setLoading(false);
        }
      } catch (err) {
        // catch the error and set the error
        // setError(err.message);
      }
    }

    fetchData();
  }, []);
  return { time, loading };
}
