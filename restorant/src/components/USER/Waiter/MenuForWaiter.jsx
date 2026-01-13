import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import useOrderMeal from "../../../hooks/useOrderMeal.js";
import useOrderBySingleTable from "../../../hooks/useOrderBySingleTable.js";

const MenuForWaiter = ({
                           meals,
                           setQuery,
                           query,
                           tableId,
                           onAddMeal,
                           orderByTable,
                           onRemoveMeal
                       }) => {
    const navigate = useNavigate();
    const order = useOrderBySingleTable(tableId);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const addOrder = useOrderMeal(tableId);
    const handleSubmit = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await addOrder();
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } catch (error) {
            console.error("Error submitting order:", error);
            setIsSubmitting(false);
        }
    };


    return (
        //MOE
        // <section id='menu' className="relative py-8 w-full bg-[url('/menu-bg-small.jpg')]
        // bg-cover bg-center bg-no-repeat bg-fixed">
        //     {/*<h1 className="text-center text-2xl font-bold">Маса/Table {tableId}</h1>*/}
        //     <div className="relative text-8xl text-shadow-lg/30 text-white font-bold text-center">
        //         Menu
        //     </div>
        //     <div
        //         className="relative py-5 flex items-center sm:justify-center justify-start space-x-8 overflow-x-auto snap-x snap-proximity  whitespace-nowrap flex-nowrap px-4">
        //         {categories.map(item => (
        //             <button key={item.id} className="justify-items-center cursor-pointer min-w-20 min-h-15"
        //                     onClick={() => setSelectedCategory(item.id)}
        //             >
        //                 <img src={"http://127.0.0.1:8000/media/" + item.photo} className="h-18"></img>
        //                 <div className="font-bold">{item.title}</div>
        //             </button>
        //         ))}
        //     </div>
        //
        //
        //     <table className="relative table-auto border-collapse">
        //         <tbody>
        //         {meals.map(food => {
        //                 const orderItem = orderByTable?.meals?.find(item => item.id === food.id);
        //                 const count = orderItem ? orderItem.count : 0;
        //                 return (
        //                     <tr className=" transition-colors h-25 lg:h-80 md:h-40">
        //                         <td className=" justify-items-center" width={"20%"}>
        //                             <img src={"http://127.0.0.1:8000/media/" + food.photo} alt={food.title}/>
        //                         </td>
        //                         <td className=" px-4 py-2  md:text-3xl text-xl font-bold h-5 overflow-y-auto"
        //                             width={"60%"}>
        //                             <div
        //                                 className="md:max-h-50 lg:h-full lg:text-4xl max-h-20 overflow-y-auto text-base">{food.titleMK} / {food.title}
        //                                 <div className="lg:text-4xl md:text-xl text-sm pt-2 font-light">
        //                                     {food.descriptionMK}
        //                                     <div className="border-black/50 w-full border-1"></div>
        //                                     {food.description}
        //                                 </div>
        //                             </div>
        //                         </td>
        //                         <td className="  px-0 py-2 lg:text-4xl md:text-2xl text-sm " width={"10%"}>
        //                             <span className={"font-bold"}>{food.priceMK}</span> д <div></div> <span
        //                             className="font-bold">{food.price}</span> €
        //                         </td>
        //                         <td className="  px-0 py-2 lg:text-4x " width={"10%"}>
        //                             <div className="grid justify-center">
        //                                 <button
        //                                     onClick={() => onAddMeal(food.id)}
        //                                     title="Add New"
        //                                     className="cursor-pointer border-3 lg:border-5 md:border-4 border-green-500 rounded-full flex justify-center
        //                                     lg:w-10 lg:h-10 w-6 h-6 md:w-8 md:h-8 items-center active:brightness-80 active:bg-green-500"
        //                                 >
        //                                     <IoAddSharp className="text-green-800 "/>
        //                                 </button>
        //                                 <div className="flex justify-center text-lg font-bold md:text-2xl my-1 lg:text-3xl">
        //                                     {count}
        //                                 </div>
        //                                 <button
        //                                     onClick={() => onRemoveMeal(food.id)}
        //                                     title="Add New"
        //                                     className="cursor-pointer border-3 md:border-4 lg:border-5 border-red-500 rounded-full
        //                                     flex justify-center lg:w-10 md:w-8 md:h-8 lg:h-10 w-6 h-6 items-center
        //                                     active:brightness-80 active:bg-red-500"
        //                                 >
        //                                     <IoIosRemove className='text-red-800'/>
        //                                 </button>
        //                             </div>
        //                         </td>
        //                     </tr>
        //                 )
        //             }
        //         )}
        //         </tbody>
        //     </table>
        //     <div className="flex justify-end m-5">
        //         <button
        //             className="bg-blue-500 hover:bg-blue-500 cursor-pointer text-white font-bold lg:py-3 lg:px-6 py-2 px-3 rounded-full"
        //             onClick={() => navigate(`/order/${tableId}`)}
        //         >ORDER
        //         </button>
        //     </div>
        // </section>

        // DEEPSEEK
        // <section id='menu' className="relative py-6 w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        //     {/* Декоративни елементи */}
        //     <div className="absolute inset-0 bg-[url('/menu-bg-small.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        //     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>
        //
        //     {/* Заглавие */}
        //     <div className="relative px-4 mb-8">
        //         <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 drop-shadow-lg">
        //             Мени
        //         </h1>
        //         <p className="text-center text-gray-300 text-lg md:text-xl">
        //             Одберете ја вашата категорија и додадете јажења во вашата нарачка
        //         </p>
        //         {/* Table indicator (optional) */}
        //         {tableId && (
        //             <div className="absolute top-0 right-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
        //                 <span className="text-white font-semibold">Маса {tableId}</span>
        //             </div>
        //         )}
        //     </div>
        //
        //     {/* Категории */}
        //     <div className="relative px-4 mb-10">
        //         <div className="flex items-center justify-between mb-4">
        //             <h2 className="text-white text-xl md:text-2xl font-bold">Категории</h2>
        //             <div className="hidden md:flex items-center space-x-2">
        //                 <button className="p-2 rounded-full bg-white/10 text-white">
        //                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        //                     </svg>
        //                 </button>
        //                 <button className="p-2 rounded-full bg-white/10 text-white">
        //                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        //                     </svg>
        //                 </button>
        //             </div>
        //         </div>
        //
        //         <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        //             {categories.map(item => (
        //                 <button
        //                     key={item.id}
        //                     className={`flex flex-col items-center flex-shrink-0 transition-all duration-300 ${selectedCategory === item.id ? 'scale-105' : ''}`}
        //                     onClick={() => setSelectedCategory(item.id)}
        //                 >
        //                     <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 ${selectedCategory === item.id ? 'border-yellow-500' : 'border-gray-700'} transition-colors mb-2`}>
        //                         <img
        //                             src={"http://127.0.0.1:8000/media/" + item.photo}
        //                             alt={item.title}
        //                             className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        //                         />
        //                     </div>
        //                     <div className={`font-bold text-sm md:text-base ${selectedCategory === item.id ? 'text-yellow-400' : 'text-white'}`}>
        //                         {item.title}
        //                     </div>
        //                 </button>
        //             ))}
        //         </div>
        //     </div>
        //
        //     {/* Јадења */}
        //     <div className="relative px-4 mb-16">
        //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        //             {meals.map(food => {
        //                 const orderItem = orderByTable?.meals?.find(item => item.id === food.id);
        //                 const count = orderItem ? orderItem.count : 0;
        //
        //                 return (
        //                     <div
        //                         key={food.id}
        //                         className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300"
        //                     >
        //                         <div className="flex flex-col md:flex-row">
        //                             {/* Слика */}
        //                             <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
        //                                 <img
        //                                     src={"http://127.0.0.1:8000/media/" + food.photo}
        //                                     alt={food.title}
        //                                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        //                                 />
        //                                 {count > 0 && (
        //                                     <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg">
        //                                         {count}
        //                                     </div>
        //                                 )}
        //                             </div>
        //
        //                             {/* Содржина */}
        //                             <div className="md:w-3/5 p-5 flex flex-col">
        //                                 {/* Наслов и цена */}
        //                                 <div className="flex justify-between items-start mb-3">
        //                                     <div>
        //                                         <h3 className="text-white text-xl md:text-2xl font-bold mb-1">{food.titleMK}</h3>
        //                                         <h4 className="text-gray-300 text-lg italic mb-2">{food.title}</h4>
        //                                     </div>
        //                                     <div className="text-right">
        //                                         <div className="text-yellow-400 font-bold text-xl md:text-2xl">{food.price} €</div>
        //                                         <div className="text-gray-400 text-sm">{food.priceMK} ден</div>
        //                                     </div>
        //                                 </div>
        //
        //                                 {/* Опис */}
        //                                 <div className="mb-4 flex-grow">
        //                                     <p className="text-gray-200 mb-2 text-sm md:text-base">{food.descriptionMK}</p>
        //                                     <div className="h-px bg-gray-600/50 my-2"></div>
        //                                     <p className="text-gray-300 italic text-sm md:text-base">{food.description}</p>
        //                                 </div>
        //
        //                                 {/* Контроли за нарачка */}
        //                                 <div className="flex items-center justify-between mt-auto">
        //                                     <div className="flex items-center space-x-2">
        //                                         <button
        //                                             onClick={() => onRemoveMeal(food.id)}
        //                                             disabled={count === 0}
        //                                             className={`cursor-pointer rounded-full flex justify-center items-center w-10 h-10 md:w-12 md:h-12 transition-all ${count === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500/20 active:scale-95'}`}
        //                                             title="Отстрани"
        //                                         >
        //                                             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-red-500 flex items-center justify-center">
        //                                                 <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"></path>
        //                                                 </svg>
        //                                             </div>
        //                                         </button>
        //
        //                                         <div className="w-12 text-center">
        //                                             <span className="text-white font-bold text-2xl md:text-3xl">{count}</span>
        //                                         </div>
        //
        //                                         <button
        //                                             onClick={() => onAddMeal(food.id)}
        //                                             className="cursor-pointer rounded-full flex justify-center items-center w-10 h-10 md:w-12 md:h-12 transition-all hover:bg-green-500/20 active:scale-95"
        //                                             title="Додади"
        //                                         >
        //                                             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-green-500 flex items-center justify-center">
        //                                                 <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
        //                                                 </svg>
        //                                             </div>
        //                                         </button>
        //                                     </div>
        //
        //                                     {/* Индикатор за состојба */}
        //                                     <div className={`px-3 py-1 rounded-full text-xs font-bold ${count === 0 ? 'bg-gray-700/50 text-gray-400' : 'bg-yellow-500/20 text-yellow-300'}`}>
        //                                         {count === 0 ? 'Не е додадено' : 'Во нарачката'}
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 );
        //             })}
        //         </div>
        //     </div>
        //
        //     {/* Копче за нарачка */}
        //     <div className="fixed bottom-6 left-0 right-0 px-4 z-10">
        //         <div className="max-w-6xl mx-auto flex justify-between items-center">
        //             <div className="bg-black/80 backdrop-blur-lg rounded-2xl px-5 py-3 shadow-2xl">
        //                 <div className="text-white">
        //                     <div className="text-sm text-gray-300">Вкупно јадења:</div>
        //                     <div className="text-2xl font-bold">
        //                         {orderByTable?.meals?.reduce((total, item) => total + item.count, 0) || 0}
        //                     </div>
        //                 </div>
        //             </div>
        //
        //             <button
        //                 className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 cursor-pointer text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl shadow-2xl flex items-center space-x-3 transition-all duration-300 hover:scale-105 active:scale-95"
        //                 onClick={() => navigate(`/order/${tableId}`)}
        //             >
        //                 <span>Нарачајте сега</span>
        //                 <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        //                 </svg>
        //             </button>
        //
        //             <div className="bg-black/80 backdrop-blur-lg rounded-2xl px-5 py-3 shadow-2xl">
        //                 <div className="text-white">
        //                     <div className="text-sm text-gray-300">Вкупно цена:</div>
        //                     <div className="text-2xl font-bold">
        //                         {orderByTable?.meals?.reduce((total_price, item) => total_price + (item.price * item.count), 0)?.toFixed(2) || '0.00'} €
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>

        // DEEPSEEK TABLE
        <section id='menu' className="relative py-6 w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Декоративни елементи */}
            <div
                className="absolute inset-0 bg-[url('/menu-bg-small.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>
            <div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>

            {/* Заглавие */}
            <div className="relative px-4 mb-8">
                <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 drop-shadow-lg">
                    Мени
                </h1>
                <p className="text-center text-gray-300 text-lg md:text-xl">
                    Направете нарачка
                </p>
                {tableId && (
                    <div className="absolute top-0 right-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <span className="text-white font-semibold">Маса {tableId}</span>
                    </div>
                )}
            </div>
            <div>
                <button className={"absolute top-18 left-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"}
                        onClick={() => navigate(0)}>
                    <span className="text-white font-semibold">Refresh</span>
                </button>
                <button className={"absolute top-6 left-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"}
                        onClick={() => navigate("/user/tables")}>
                    <span className="text-white font-semibold">Back</span>
                </button>
            </div>

            {/* Категории */}
            {/*<div className="relative px-4 mb-10">*/}
            {/*    <h2 className="text-white text-xl md:text-2xl font-bold mb-4">Категории</h2>*/}
            {/*    <div*/}
            {/*        className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">*/}
            {/*        {categories.map(item => (*/}
            {/*            <button*/}
            {/*                key={item.id}*/}
            {/*                className={`flex flex-col items-center flex-shrink-0 transition-all duration-300 ${selectedCategory === item.id ? 'scale-105' : ''}`}*/}
            {/*                onClick={() => setSelectedCategory(item.id)}*/}
            {/*            >*/}
            {/*                <div*/}
            {/*                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 ${selectedCategory === item.id ? 'border-yellow-500' : 'border-gray-700'} transition-colors mb-2`}>*/}
            {/*                    <img*/}
            {/*                        src={"http://127.0.0.1:8000/media/" + item.photo}*/}
            {/*                        alt={item.title}*/}
            {/*                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div*/}
            {/*                    className={`font-bold text-sm md:text-base ${selectedCategory === item.id ? 'text-yellow-400' : 'text-white'}`}>*/}
            {/*                    {item.title}*/}
            {/*                </div>*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className='relative p-5 text-white '>
                <input
                    type="text"
                    placeholder="Пребарувај со кирилица..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full md:w-80 px-4 py-3 pl-12 rounded-xl shadow-sm focus:outline-none ring-1 ring-white focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <svg
                    className="absolute left-8.5 top-8.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            {order.meals && order.meals.length > 0 ? (
                <div className="space-y-4 mx-5 mb-4">{order.meals.map(item => (
                    <div key={item.id}
                         className="flex  items-center justify-between bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800/70 transition-colors">
                        <div className="flex-1">
                            <h3 className="text-white font-semibold">{item.titleMK}</h3>
                            <p className="text-gray-300 text-sm italic">{item.title}</p>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <div className="text-yellow-400 font-bold text-xl">{item.count}x</div>
                                <div className="text-gray-400 text-xs">количина</div>
                            </div>
                            {/*<div className="text-right">*/}
                            {/*    <div className="text-white font-bold">{(item.price * item.count).toFixed(2)} €</div>*/}
                            {/*    <div className="text-gray-400 text-xs">{(item.priceMK * item.count)} ден</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                ))}</div>
            ) : null
            }

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
                            const orderItem = orderByTable?.meals?.find(item => item.id === food.id);
                            const count = orderItem ? orderItem.count : 0;

                            return (
                                <tr
                                    key={food.id}
                                    className={`border-t border-gray-700/50 transition-all duration-200 hover:bg-white/5 ${index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/10'}`}
                                >
                                    {/* Слика */}
                                    <td className="py-4 px-3 align-top">

                                        {/*</td>*/}

                                        {/*/!* Опис на јадење *!/*/}
                                        {/*<td className="py-4 px-4 align-top">*/}
                                        <div className="space-y-2 flex justify-between">
                                            <div>
                                                <h3 className="text-white text-lg md:text-xl font-bold">{food.titleMK}</h3>
                                                <h4 className="text-gray-300 text-sm md:text-base italic">{food.title}</h4>
                                            </div>

                                            <div className="relative group">
                                                <div
                                                    className="w-24 h-24 md:w-50 md:h-50 rounded-xl overflow-hidden border-2   border-gray-600">
                                                    <img
                                                        src={"https://res.cloudinary.com/dqscvd9as/image/upload/v1768314305/"+food.photo}
                                                        alt={food.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                {count > 0 && (
                                                    <div
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
                                                        {count}
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-gray-200 text-sm md:text-base">{food.descriptionMK}</p>
                                            <div className="h-px w-20 bg-gray-600/50"></div>
                                            <p className="text-gray-300 text-sm md:text-base italic">{food.description}</p>
                                        </div>
                                    </td>

                                    {/* Цена */}
                                    <td className="py-4 px-2 align-top">
                                        <div className="space-y-1 w-10">

                                            <div
                                                className="text-yellow-400 font-bold text-xl md:text-2xl">{food.priceMK} ден
                                            </div>
                                            <div className="text-gray-400 text-sm md:text-base">{food.price} €</div>

                                            {/*{count > 0 && (*/}
                                            {/*    <div className="mt-2 pt-2 border-t border-gray-700/50">*/}
                                            {/*        <div className="text-gray-300 text-sm">Вкупно:</div>*/}
                                            {/*        <div className="text-green-400 font-bold">{(food.price * count).toFixed(2)} €</div>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
                                            {/*<div className=" flex space-y-3 ">*/}
                                            {/* Копчиња за количина */}
                                            <div className=" space-y-2">
                                                <button
                                                    onClick={() => onAddMeal(food.id)}
                                                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all hover:bg-green-500/20 active:scale-95"
                                                    title="Додади"
                                                >
                                                    <div
                                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-green-500 flex items-center justify-center">
                                                        <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500"
                                                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="3" d="M12 4v16m8-8H4"></path>
                                                        </svg>
                                                    </div>
                                                </button>


                                                {/*                            <div className="min-w-12 text-center">*/}
                                                {/*/!*<span*!/*/}
                                                {/*/!*    className={`text-2xl md:text-3xl font-bold ${count > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>*!/*/}
                                                {/*/!*  {count}*!/*/}
                                                {/*/!*</span>*!/*/}
                                                {/*                            </div>*/}
                                                <button
                                                    onClick={() => onRemoveMeal(food.id)}
                                                    disabled={count === 0}
                                                    className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all ${count === 0 ? 'opacity-50 cursor-not-allowed border-gray-600' : 'hover:bg-red-500/20 active:scale-95 border-red-500'}`}
                                                    title="Отстрани"
                                                >
                                                    <div
                                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center ${count === 0 ? 'border-gray-600' : 'border-red-500'}`}>
                                                        <svg
                                                            className={`w-5 h-5 md:w-6 md:h-6 ${count === 0 ? 'text-gray-500' : 'text-red-500'}`}
                                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="3" d="M20 12H4"></path>
                                                        </svg>
                                                    </div>
                                                </button>

                                            </div>

                                            {/* Статус индикатор */}
                                            {/*<div className={`px-3 py-1 rounded-full text-xs font-bold ${count === 0 ? 'bg-gray-800/50 text-gray-400' : 'bg-yellow-500/20 text-yellow-300'}`}>*/}
                                            {/*    {count === 0 ? 'Не е додадено' : null}*/}
                                            {/*</div>*/}
                                            {/*{count > 0 && (*/}
                                            {/*    <div className="mt-2 pt-2 border-t border-gray-700/50">*/}
                                            {/*        <div className="text-gray-300 text-sm">Вкупно:</div>*/}
                                            {/*        <div*/}
                                            {/*            className="text-green-400 font-bold">{(food.priceMK * count)} ден.*/}
                                            {/*        </div>*/}
                                            {/*        <div*/}
                                            {/*            className="text-green-400 font-bold">{(food.price * count).toFixed(2)} €*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}

                                            {/* Копче за брзо додавање */}
                                            {/*<button*/}
                                            {/*    onClick={() => {*/}
                                            {/*        if (count === 0) {*/}
                                            {/*            onAddMeal(food.id);*/}
                                            {/*        }*/}
                                            {/*    }}*/}
                                            {/*    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${count === 0 ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400 cursor-default'}`}*/}
                                            {/*>*/}
                                            {/*    {count === 0 ? 'Додади во нарачка' : 'Веќе додадено'}*/}
                                            {/*</button>*/}
                                        </div>
                                        {/*</div>*/}
                                    </td>

                                    {/* Контроли за нарачка */}
                                    {/*<td className="py-4 px-4 align-top">*/}
                                    {/*                <div className="flex flex-col items-center space-y-3">*/}
                                    {/*                    /!* Копчиња за количина *!/*/}
                                    {/*                    <div className="flex items-center space-x-3">*/}
                                    {/*                        <button*/}
                                    {/*                            onClick={() => onRemoveMeal(food.id)}*/}
                                    {/*                            disabled={count === 0}*/}
                                    {/*                            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all ${count === 0 ? 'opacity-50 cursor-not-allowed border-gray-600' : 'hover:bg-red-500/20 active:scale-95 border-red-500'}`}*/}
                                    {/*                            title="Отстрани"*/}
                                    {/*                        >*/}
                                    {/*                            <div*/}
                                    {/*                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center ${count === 0 ? 'border-gray-600' : 'border-red-500'}`}>*/}
                                    {/*                                <svg*/}
                                    {/*                                    className={`w-5 h-5 md:w-6 md:h-6 ${count === 0 ? 'text-gray-500' : 'text-red-500'}`}*/}
                                    {/*                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                                    {/*                                    <path strokeLinecap="round" strokeLinejoin="round"*/}
                                    {/*                                          strokeWidth="3" d="M20 12H4"></path>*/}
                                    {/*                                </svg>*/}
                                    {/*                            </div>*/}
                                    {/*                        </button>*/}

                                    {/*                        <div className="min-w-12 text-center">*/}
                                    {/*<span*/}
                                    {/*    className={`text-2xl md:text-3xl font-bold ${count > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>*/}
                                    {/*  {count}*/}
                                    {/*</span>*/}
                                    {/*                        </div>*/}

                                    {/*                        <button*/}
                                    {/*                            onClick={() => onAddMeal(food.id)}*/}
                                    {/*                            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all hover:bg-green-500/20 active:scale-95"*/}
                                    {/*                            title="Додади"*/}
                                    {/*                        >*/}
                                    {/*                            <div*/}
                                    {/*                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-green-500 flex items-center justify-center">*/}
                                    {/*                                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500"*/}
                                    {/*                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                                    {/*                                    <path strokeLinecap="round" strokeLinejoin="round"*/}
                                    {/*                                          strokeWidth="3" d="M12 4v16m8-8H4"></path>*/}
                                    {/*                                </svg>*/}
                                    {/*                            </div>*/}
                                    {/*                        </button>*/}
                                    {/*                    </div>*/}

                                    {/*                    /!* Статус индикатор *!/*/}
                                    {/*                    /!*<div className={`px-3 py-1 rounded-full text-xs font-bold ${count === 0 ? 'bg-gray-800/50 text-gray-400' : 'bg-yellow-500/20 text-yellow-300'}`}>*!/*/}
                                    {/*                    /!*    {count === 0 ? 'Не е додадено' : null}*!/*/}
                                    {/*                    /!*</div>*!/*/}
                                    {/*                    {count > 0 && (*/}
                                    {/*                        <div className="mt-2 pt-2 border-t border-gray-700/50">*/}
                                    {/*                            <div className="text-gray-300 text-sm">Вкупно:</div>*/}
                                    {/*                            <div*/}
                                    {/*                                className="text-green-400 font-bold">{(food.priceMK * count)} ден.*/}
                                    {/*                            </div>*/}
                                    {/*                            <div*/}
                                    {/*                                className="text-green-400 font-bold">{(food.price * count).toFixed(2)} €*/}
                                    {/*                            </div>*/}
                                    {/*                        </div>*/}
                                    {/*                    )}*/}

                                    {/*                    /!* Копче за брзо додавање *!/*/}
                                    {/*                    /!*<button*!/*/}
                                    {/*                    /!*    onClick={() => {*!/*/}
                                    {/*                    /!*        if (count === 0) {*!/*/}
                                    {/*                    /!*            onAddMeal(food.id);*!/*/}
                                    {/*                    /!*        }*!/*/}
                                    {/*                    /!*    }}*!/*/}
                                    {/*                    /!*    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${count === 0 ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400 cursor-default'}`}*!/*/}
                                    {/*                    /!*>*!/*/}
                                    {/*                    /!*    {count === 0 ? 'Додади во нарачка' : 'Веќе додадено'}*!/*/}
                                    {/*                    /!*</button>*!/*/}
                                    {/*                </div>*/}
                                    {/*            </td>*/}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    {/* Сообщение кога нема јадења */}
                    {meals.length === 0 && (
                        <div className="py-16 text-center bg-gray-900/30">
                            <div className="text-gray-400 text-xl">Нема достапни јадења</div>
                        </div>
                    )}
                </div>

                {/* Информација за вкупно */}
                {/*<div className="mt-6 flex justify-end">*/}
                {/*    <div className="bg-black/80 backdrop-blur-lg rounded-xl px-6 py-4 shadow-xl">*/}
                {/*        <div className="flex items-center space-x-8">*/}
                {/*            <div className="text-center">*/}
                {/*                <div className="text-gray-300 text-sm">Вкупно нарачки:</div>*/}
                {/*                <div className="text-2xl font-bold text-white">*/}
                {/*                    {orderByTable?.meals?.reduce((total, item) => total + item.count, 0) || 0}*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="h-12 w-px bg-gray-600"></div>*/}
                {/*            <div className="text-center">*/}
                {/*                <div className="text-gray-300 text-sm">Вкупно цена:</div>*/}
                {/*                <div className="text-2xl font-bold text-yellow-400">*/}
                {/*                    {orderByTable?.meals?.reduce((total, item) => total + (item.price * item.count), 0)?.toFixed(2) || '0.00'} €*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            {/* Фиксно копче за нарачка */}
            <div className="fixed bottom-6 left-0 right-0 px-4 z-10">
                <div className="max-w-6xl mx-auto flex justify-center">
                    <button
                        className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 cursor-pointer text-white font-bold py-2 px-10 rounded-full text-lg md:text-xl shadow-2xl flex items-center space-x-3 transition-all duration-300 hover:scale-105 active:scale-95"
                        onClick={handleSubmit}
                        disabled={!orderByTable?.meals?.some(item => item.count > 0)}
                    >
                        <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>Прати нарачка</span>
                        <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

    )
}
export default MenuForWaiter