
const MenuBook = ({categories,meals,selectedCategory,setSelectedCategory}) => {
    // const categories = useCategories()
    // const
    return (
        <section id='menu' className="relative py-8 w-full bg-[url('/menu-bg-small.jpg')]
        bg-cover bg-center bg-no-repeat bg-fixed">
            <div className="relative text-8xl text-shadow-lg/30 text-white font-bold text-center">
                Menu
            </div>

            <h1 className="relativ"></h1>
            {/*<div*/}
            {/*    className="relative py-5 flex items-center lg:justify-center justify-start space-x-8 overflow-x-auto snap-x snap-proximity  whitespace-nowrap flex-nowrap px-4">*/}
            {/*    {categories.map(item => (*/}
            {/*        <button key={item.id} className="justify-items-center cursor-pointer "*/}
            {/*                onClick={() => setSelectedCategory(item.id)}*/}
            {/*        >*/}
            {/*            <img src={"http://127.0.0.1:8000/media/"+item.photo} className={"w-30 h-25"}></img>*/}
            {/*            <div>{item.title}</div>*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div
                className="relative py-5 flex items-center sm:justify-center justify-start space-x-8 overflow-x-auto snap-x snap-proximity  whitespace-nowrap flex-nowrap px-4">
                {categories.map(item => (
                    <button key={item.id} className="justify-items-center cursor-pointer "
                            onClick={() => setSelectedCategory(item.id)}
                    >
                        <img src={"http://127.0.0.1:8000/media/"+item.photo} className={"w-30 h-25"}></img>
                        <div>{item.title}</div>
                    </button>
                ))}
            </div>
            {/*<div className="relative grid lg:grid-cols-3 justify-items-center">*/}
            {/*    {menuData[selectedCategory]?.map((food) => (*/}
            {/*        <div*/}
            {/*            className="bg-black/50 lg:w-96 w-80  justify-items-center p-5 rounded-2xl my-5"*/}
            {/*        >*/}
            {/*            <img*/}
            {/*                src={food.icon}*/}
            {/*                onScroll={handleScroll} style={{ overflowY: 'scroll', height: '400px' }}*/}

            {/*                alt={food.title}*/}
            {/*            />*/}
            {/*            <h3 className="text-white">{food.title}</h3>*/}
            {/*            <p className="text-lg text-gray-300">{food.description}</p>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}


            <table className="relative table-auto border-collapse">
                <tbody>
                {meals.map(food => (
                    <tr className=" transition-colors h-25 lg:h-80">
                        <td className=" justify-items-center " width={"20%"}>
                            <img src={"http://127.0.0.1:8000/media/"+food.photo} alt={food.title} />
                        </td>
                        <td className=" px-4 py-2 lg:text-5xl text-xl font-bold  align-text-top" width={"60%"}>{food.titleMK} / {food.title}
                            <div className="lg:text-2xl text-sm pt-2 font-light">
                                {food.descriptionMK}
                                <div className="border-black/50 w-full border-1"></div>
                                {food.description}
                            </div>
                        </td>
                        <td className=" px-0 py-2 lg:text-4xl text-xl align-text-top" width={"20%"}><span className={"font-bold"}>{food.priceMK}</span> ден <div></div> <span className="font-bold">{food.price}</span> €</td>
                    </tr>
                ))}
                </tbody>
            </table>



            {/*2 NACIN*/}
            {/*<table className="relative table-auto border-collapse">*/}
            {/*    <tbody>*/}
            {/*    {meals.map(food => (*/}
            {/*        <tr className=" transition-colors h-25 lg:h-80">*/}
            {/*            <td className=" justify-items-center " width={"20%"}>*/}
            {/*                <img src={"http://127.0.0.1:8000/media/"+food.photo} alt={food.title} />*/}
            {/*            </td>*/}
            {/*            <td className=" px-4 py-2 lg:text-5xl text-xl font-bold  align-text-top" width={"60%"}>{food.titleMK}*/}
            {/*                <div className="lg:text-2xl text-sm pt-2 font-light">*/}
            {/*                    {food.descriptionMK}*/}
            {/*                </div>*/}
            {/*                <div className="border-black/50 w-full border-1"></div>*/}
            {/*                {food.title}*/}
            {/*                <div className="lg:text-2xl text-sm pt-2 font-light">*/}
            {/*                    {food.description}*/}
            {/*                </div>*/}
            {/*            </td>*/}
            {/*            <td className=" px-0 py-2 lg:text-4xl text-xl align-text-top" width={"20%"}><span className={"font-bold"}>{food.priceMK}</span> ден <div></div> <span className="font-bold">{food.price}</span> €</td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </section>
    )
}
export default MenuBook