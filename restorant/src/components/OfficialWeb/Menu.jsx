
const MenuBook = ({t,l,categories,meals,selectedCategory,setSelectedCategory}) => {
    // const categories = useCategories()
    // const
    return (
        <section id='menu' className="relative py-6 w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div
                className="absolute inset-0 bg-[url('/menu-bg-small.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>

            <div className="relative text-8xl text-shadow-lg/30 text-white font-bold text-center">
                {t.menu}
            </div>

            <div className="relative px-4 mb-10">
                <h2 className="text-white text-xl md:text-2xl text-center font-bold mb-4">{t.categories}</h2>
                <div
                    className="flex space-x-4 py-2 justify-start lg:justify-center md:space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {categories.map(item => (
                        <button
                            key={item.id}
                            className={`flex flex-col items-center flex-shrink-0 transition-all duration-300 ${selectedCategory === item.id ? 'scale-105' : ''}`}
                            onClick={() => setSelectedCategory(item.id)}
                        >
                            <div
                                className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 ${selectedCategory === item.id ? 'border-yellow-500' : 'border-gray-700'} transition-colors mb-2`}>
                                <img
                                    src={"https://restorantproject-1.onrender.com/media/" + item.photo}
                                    alt={item.title}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div
                                className={`font-bold text-sm md:text-base ${selectedCategory === item.id ? 'text-yellow-400' : 'text-white'}`}>
                                {l==='mk' ? item.titleMK: item.title}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Табела со јадења */}
            <div className="relative px-4 mb-24">
                <div className="overflow-x-auto rounded-2xl border border-gray-700/50 shadow-2xl">
                    <table className="w-full border-collapse bg-white/5 backdrop-blur-sm">
                        {/* Table Header */}
                        {/*<thead className="bg-gray-800/80">*/}
                        {/*<tr>*/}
                        {/*    <th className="py-4 px-4 text-left text-white font-bold text-lg md:text-xl w-1/5">Слика</th>*/}
                        {/*    <th className="py-4 px-4 text-left text-white font-bold text-lg md:text-xl w-2/5">Јадење</th>*/}
                        {/*    <th className="py-4 px-4 text-left text-white font-bold text-lg md:text-xl w-1/5">Цена</th>*/}
                        {/*    <th className="py-4 px-4 text-left text-white font-bold text-lg md:text-xl w-1/5">Нарачка</th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}

                        {/* Table Body */}
                        <tbody>
                        {meals.map((food, index) => {

                            return (
                                <tr
                                    key={food.id}
                                    className={`border-t border-gray-700/50 transition-all duration-200 hover:bg-white/5 ${index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/10'}`}
                                >
                                    <td className="py-4 px-3 align-top">

                                        <div className="space-y-2  flex justify-between">
                                            <div>
                                                {l==='mk' ? <h3 className="text-white text-lg md:text-xl font-bold">{food.titleMK}</h3> : <h3 className="text-white text-lg md:text-xl font-bold">{food.title}</h3>}</div>
                                            <div className="relative group">
                                                <div
                                                    className="w-24 h-24 md:w-50 md:h-50 rounded-xl overflow-hidden border-2   border-gray-600">
                                                    <img
                                                        src={"https://restorantproject-1.onrender.com/media/" + food.photo}
                                                        alt={food.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="space-y-2">
                                            {l==='mk'? <p className="text-gray-200 text-sm md:text-base">{food.descriptionMK}</p> : <p className="text-gray-200 text-sm md:text-base">{food.description}</p>}
                                        </div>
                                    </td>

                                    <td className="py-4 px-2 align-top">
                                        <div className="space-y-1 w-10">

                                            <div className="text-yellow-400 font-bold text-xl md:text-2xl">
                                                {/*{food.priceMK} ден*/}
                                                {l==='mk'? <span>{food.priceMK} ден.</span> : <span>{food.price} €</span>}
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>


            {/*NEZ*/}
            {/*<h1 className="relativ"></h1>*/}
            {/*/!*<div*!/*/}
            {/*/!*    className="relative py-5 flex items-center lg:justify-center justify-start space-x-8 overflow-x-auto snap-x snap-proximity  whitespace-nowrap flex-nowrap px-4">*!/*/}
            {/*/!*    {categories.map(item => (*!/*/}
            {/*/!*        <button key={item.id} className="justify-items-center cursor-pointer "*!/*/}
            {/*/!*                onClick={() => setSelectedCategory(item.id)}*!/*/}
            {/*/!*        >*!/*/}
            {/*/!*            <img src={"http://127.0.0.1:8000/media/"+item.photo} className={"w-30 h-25"}></img>*!/*/}
            {/*/!*            <div>{item.title}</div>*!/*/}
            {/*/!*        </button>*!/*/}
            {/*/!*    ))}*!/*/}
            {/*/!*</div>*!/*/}
            {/*<div*/}
            {/*    className="relative py-5 flex items-center sm:justify-center justify-start space-x-8 overflow-x-auto snap-x snap-proximity  whitespace-nowrap flex-nowrap px-4">*/}
            {/*    {categories.map(item => (*/}
            {/*        <button key={item.id} className="justify-items-center cursor-pointer "*/}
            {/*                onClick={() => setSelectedCategory(item.id)}*/}
            {/*        >*/}
            {/*            <img src={"http://127.0.0.1:8000/media/"+item.photo} className={"w-30 h-25"}></img>*/}
            {/*            <div>{item.title}</div>*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*/!*<div className="relative grid lg:grid-cols-3 justify-items-center">*!/*/}
            {/*/!*    {menuData[selectedCategory]?.map((food) => (*!/*/}
            {/*/!*        <div*!/*/}
            {/*/!*            className="bg-black/50 lg:w-96 w-80  justify-items-center p-5 rounded-2xl my-5"*!/*/}
            {/*/!*        >*!/*/}
            {/*/!*            <img*!/*/}
            {/*/!*                src={food.icon}*!/*/}
            {/*/!*                onScroll={handleScroll} style={{ overflowY: 'scroll', height: '400px' }}*!/*/}

            {/*/!*                alt={food.title}*!/*/}
            {/*/!*            />*!/*/}
            {/*/!*            <h3 className="text-white">{food.title}</h3>*!/*/}
            {/*/!*            <p className="text-lg text-gray-300">{food.description}</p>*!/*/}
            {/*/!*        </div>*!/*/}
            {/*/!*    ))}*!/*/}
            {/*/!*</div>*!/*/}


            {/*<table className="relative table-auto border-collapse">*/}
            {/*    <tbody>*/}
            {/*    {meals.map(food => (*/}
            {/*        <tr className=" transition-colors h-25 lg:h-80">*/}
            {/*            <td className=" justify-items-center " width={"20%"}>*/}
            {/*                <img src={"http://127.0.0.1:8000/media/"+food.photo} alt={food.title} />*/}
            {/*            </td>*/}
            {/*            <td className=" px-4 py-2 lg:text-5xl text-xl font-bold  align-text-top" width={"60%"}>{food.titleMK} / {food.title}*/}
            {/*                <div className="lg:text-2xl text-sm pt-2 font-light">*/}
            {/*                    {food.descriptionMK}*/}
            {/*                    <div className="border-black/50 w-full border-1"></div>*/}
            {/*                    {food.description}*/}
            {/*                </div>*/}
            {/*            </td>*/}
            {/*            <td className=" px-0 py-2 lg:text-4xl text-xl align-text-top" width={"20%"}><span className={"font-bold"}>{food.priceMK}</span> ден <div></div> <span className="font-bold">{food.price}</span> €</td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}



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