import Hero from "./Hero.jsx";
import {useEffect, useState} from "react";
import {Menu, X} from 'lucide-react';
import Navigation from "./Navigation.jsx";
import AboutUs from "./AboutUs.jsx";
import MenuBook from "./Menu.jsx";
import Location from "./Location.jsx";
import Contact from "./Contact.jsx";
import useCategories from "../../hooks/useCategories.js";
import useMealsFromCategory from "../../hooks/useMealsFromCategory.js";

function OfficialWeb() {
    // const [categories, setCategories] = useState([]);
    // const [meals, setMeals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(7);
    const categories = useCategories()
    const meals = useMealsFromCategory(selectedCategory);
    // useEffect(() => {
    //     fetch(`http://127.0.0.1:8000/meals/${selectedCategory}/`)
    //         .then(res => res.json())
    //         .then(meals => setMeals(meals));
    //     fetch("http://127.0.0.1:8000/categories/")
    //         .then(res => res.json())
    //         .then(data => {
    //             setCategories(data)
    //         })
    // }, [selectedCategory]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    console.log("Selected:", selectedCategory);
    console.log("Meals:", meals);
    return (
        <div>
            <main className="font-['Lora'] text-4xl">
                <button
                    onClick={toggleMenu}
                    className="cursor-pointer fixed top-6 right-6 z-50 p-3 bg-linear-to-r from-black to-gray-800
                text-white rounded-2xl shadow-2xl hover:bg-linear-to-r hover:from-gray-800
                hover:to-black transition-colors"
                >
                    {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
                <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
                <Hero/>
                <AboutUs/>
                <MenuBook categories={categories} meals={meals} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <Location/>
                <Contact/>
            </main>
        </div>

    );
}

export default OfficialWeb;


