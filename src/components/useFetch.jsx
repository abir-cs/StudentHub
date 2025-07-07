import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
        fetch(url)
        .then((res)=>{
            if(!res.ok)
                throw Error("something is wrong with json server link");

            return res.json();
        })
        .then(data=>{
            setData(data);
            setLoading(false);
        })
        .catch(err=>{
            setError(err);
            setLoading(false);
        })
    },[])
  
    return {data,loading,error};
}
 
export default useFetch;