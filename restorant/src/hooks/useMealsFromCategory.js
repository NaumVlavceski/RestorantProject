import { useEffect, useState } from "react";
import apiFetch from "../api/api.js";

const useMealsFromCategory = (selectedCategory) => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        if (!selectedCategory) return;

        // fetch(`http://127.0.0.1:8000/meals/${selectedCategory}/`)
        apiFetch(`/meals/${selectedCategory}/`)
            // .then(res => res.json())
            .then(data => setMeals(data))
            .catch(err => console.error("Error fetching meals:", err));
    }, [selectedCategory]);

    return meals;
};

export default useMealsFromCategory;
