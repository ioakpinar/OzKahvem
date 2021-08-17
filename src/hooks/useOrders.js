import {useState,useEffect} from "react"

export function useOrders() {
    const [listOrders, setListOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:12345/listorders");
                if (!response.ok) {
                    console.log("Hata döndü")
                    // throw the error
                    throw new Error(response.status);
                } else {
                    const value = await response.json();
                    setListOrders(value);
                    console.log(value)
                }
            } catch (err) {
                // catch the error and set the error
                // setError(err.message);
            }
        }

        fetchData();
    }, []);
    return {listOrders};
}