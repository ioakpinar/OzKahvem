import { useState, useEffect } from "react";

export function useFetch() {
  const [coffies, setCoffies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:12345/getcoffies");
        if (!response.ok) {
          console.log("Hata döndü");
          // throw the error
          throw new Error(response.status);
        } else {
          const value = await response.json();
          setCoffies(value);
        }
      } catch (err) {
        // catch the error and set the error
        // setError(err.message);
      }
    }

    fetchData();
  }, []);
  return { coffies };
}
