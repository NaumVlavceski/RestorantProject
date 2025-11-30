import {useState} from "react";
import useCategories from "../../hooks/useCategories.js";
import useMealsFromCategory from "../../hooks/useMealsFromCategory.js";
import MenuBook from "../OfficialWeb/Menu.jsx";

function Table() {
    const [selectedCategory, setSelectedCategory] = useState(7);
    const categories = useCategories()
    const meals = useMealsFromCategory(selectedCategory);
    return (
        <div>
            <main>
                <MenuBook categories={categories} meals={meals} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            </main>
        </div>

    );
}

export default Table;


