import {useEffect, useState} from "react";
import apiFetch from "../api/api.js";

const useMeals = (query)=>{
    const [tables, setTables] = useState([]);
    useEffect(() => {
        // fetch(`http://127.0.0.1:8000/meals/?q=${query}`)
        apiFetch(`/meals/?q=${query}`)
            // .then(res => res.json())
            .then(data => {
                setTables(data)
            })
    }, [query]);
    return tables
};
export default useMeals;