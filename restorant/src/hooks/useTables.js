import {useEffect, useState} from "react";
import apiFetch from "../api/api.js";

const useTables = (query)=>{
    const [tables, setTables] = useState([]);
    useEffect(() => {
        // fetch(`http://127.0.0.1:8000/tables/?q=${query}`)
        //     .then(res => res.json())
        apiFetch(`/tables/?q=${query}`)
            .then(data => {
                setTables(data)
            })
    }, [query]);
    return tables
};
export default useTables;