import { useState,useEffect } from "react";

function useFetchData(url) {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
            const jsonData = await response.json();
            setData(jsonData.products);
            } catch (error){
            setError(error);
            } finally{
            setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return {data, error, loading };
};

export default useFetchData;