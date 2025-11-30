import {useEffect, useState} from "react";

const useCategories = ()=>{
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/categories/")
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, []);
    return categories
};
export default useCategories;