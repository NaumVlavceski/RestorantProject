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
import {useLanguage} from "../LanguageContext.jsx";

function OfficialWeb() {
    const [selectedCategory, setSelectedCategory] = useState(1);
    const categories = useCategories()
    const meals = useMealsFromCategory(selectedCategory);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const { l, setL, t } = useLanguage();
    useEffect(() => {
        document.title = "Restorant Page"
    }, []);
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
                <button
                    onClick={()=>setL(l==='mk' ? 'en' : 'mk')}
                    className="cursor-pointer absolute top-3 left-3 z-50
                text-white rounded-2xl shadow-2xl transition-colors"
                >
                    <img src={`/public/flag_${l==='mk'? 'en' : 'mk'}.png`} className="w-10 h-10"/>
                </button>
                <Navigation t={t} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
                <Hero t={t}/>
                <AboutUs t={t}/>
                <MenuBook t={t} l={l} categories={categories} meals={meals} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <Location t={t}/>
                <Contact t={t}/>
            </main>
        </div>

    );
}

export default OfficialWeb;


