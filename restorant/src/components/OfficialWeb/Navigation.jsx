import {useNavigate} from "react-router";



const Navigation = ({t,isOpen, onClose}) => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
            onClose();
        }
    }

    const navigate = useNavigate()
    const menuItems = [
        {id: 'home', label: t.home},
        {id: 'about', label: t.about_us},
        {id: 'menu', label: t.menu},
        {id: 'location', label: t.location},
        {id: 'contact', label: t.contact},
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
                        {menuItems.map((item, index) => (
                            <li
                                key={item.id}
                                className={`transform transition-all duration-500 ${
                                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                                }`}
                                style={{transitionDelay: `${index * 50}ms`}}
                            >
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={` cursor-pointer text-white hover:text-green-400 text-2xl font-light transition-colors w-full text-left`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`absolute bottom-0 right-40`}>
                    <button className="cursor-pointer"
                        onClick={() => navigate(`/user`)}
                    >
                        <div className="w-[83px] h-[83px]  rounded-full relative flex items-center justify-center">
                            <div
                                className="absolute w-[72px] h-[72px] z-10 rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]"
                            ></div>
                            <label
                                className="group cursor-pointer absolute w-[72px] h-[72px]  rounded-full left-1/2 -translate-x-1/2 top-[5px] z-20 flex items-center justify-center"
                            >
                                <div
                                    className="w-8 group-active:w-[31px] fill-white drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24">
                                        <path
                                            d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"
                                        ></path>
                                    </svg>
                                </div>
                            </label>
                        </div>
                    </button>

                </div>
            </nav>
        </>
    )
};

export default Navigation;
