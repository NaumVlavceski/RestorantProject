const Navigation = ({isOpen, onClose}) => {
    const scrollToSection = (id) =>{
        const element = document.getElementById(id);
        if (element){
            element.scrollIntoView({behavior: "smooth"});
            onClose();
        }
    }


    const menuItems = [
        {id: 'home', label: 'Home'},
        {id: 'about', label: 'About'},
        {id: 'menu', label: 'Menu'},
        {id: 'location', label: 'Location'},
        {id: 'contact', label: 'Contact'},
    ];
    return (
        <>
            <div onClick={onClose}
                 className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}></div>
            <nav
                className={`fixed top-0 right-0 h-full w-80 bg-slate-900 z-40 transform 
                transition-transform duration-300 ease-in-out 
                ${isOpen ? 'translate-x-40' : 'translate-x-full'}`}>
                <div className={`pt-24 px-8`}>
                    <ul className={`space-y-6`}>
                        {menuItems.map((item,index)=>(
                            <li
                                key={item.id}
                                className={`transform transition-all duration-500 ${
                                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                                }`}
                                style={{transitionDelay: `${index * 50}ms`}}
                            >
                                <button
                                    onClick={()=> scrollToSection(item.id)}
                                    className={` cursor-pointer text-white hover:text-red-400 text-2xl font-light transition-colors w-full text-left`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    )
};

export default Navigation;
