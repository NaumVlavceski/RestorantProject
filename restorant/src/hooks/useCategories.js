import {useEffect, useState} from "react";
import apiFetch from "../api/api.js";

const useCategories = ()=>{
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        apiFetch(`/categories/`)
            // .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, []);
    return categories
};
export default useCategories;