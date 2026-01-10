import {useEffect, useState} from "react";
import useCategories from "../../hooks/useCategories.js";
import useMealsFromCategory from "../../hooks/useMealsFromCategory.js";
import MenuBook from "./Menu.jsx";
import {useParams} from "react-router";
import useOrderByTable from "../../hooks/useOrderByTable.js";
import {useLanguage} from "../LanguageContext.jsx";
import apiFetch from "../../api/api.js";

function Table() {
    const [selectedCategory, setSelectedCategory] = useState(1);
    const categories = useCategories();
    const meals = useMealsFromCategory(selectedCategory);
    const {tableId} = useParams();
    const [orderByTable,setOrderByTable] = useState(null)
    const { l, setL, t } = useLanguage();

    const [isWaiting, setIsWaiting] = useState(false);

    useOrderByTable(tableId,setOrderByTable);

    const addMealToTable = async (mealId) => {
        try{
            await apiFetch(`/add/${tableId}/${mealId}/`, {
                method:"POST",
                credentials :false
            });

            const orderData = await apiFetch(`/order/${tableId}/`);
            // const orderData = await orderRes.json();
            setOrderByTable(orderData);
        }catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        document.title = "Table " + tableId
        apiFetch(`/get_payment/${tableId}/`)
            .then(data => {
                if (data[0].payment_method) {
                    // setSelectedPayment(data[0].payment_method);
                    setIsWaiting(true)
                }
            });
    }, [tableId]);


    const removeMealToTable = async (mealId) => {
        try{
            await apiFetch(`/remove/${tableId}/${mealId}/`, {
                method:"POST",
                credentials :false
            });
            const orderData = await apiFetch(`/order/${tableId}/`);
            setOrderByTable(orderData);
        }catch (err){
            console.log(err)
        }
    }
    return (
        <div>
            <main>
                {isWaiting && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
                        <div
                            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-10 max-w-md mx-4 text-center shadow-2xl">
                            {/*<div*/}
                            {/*    className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mx-auto mb-6"></div>*/}
                            <div className="justify-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={100}
                                    height={100}
                                    fill="#00ca00"
                                    style={{ opacity: 1 }}
                                >
                                    <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-7.933 13.481l-3.774-3.774l1.414-1.414l2.226 2.226l4.299-5.159l1.537 1.28l-5.702 6.841z" />
                                </svg>
                            </div>
                            <h2 className="text-white text-3xl font-bold mb-4">{t.wait}</h2>
                            <p className="text-gray-300 text-xl mb-6">{t.waiter_coming}</p>
                            <div className="text-yellow-400 text-sm">{t.wait_desc}</div>
                        </div>
                    </div>
                )}
                <button
                    onClick={()=>setL(l==='mk' ? 'en' : 'mk')}
                    className="cursor-pointer absolute top-2 left-2 z-50
                text-white rounded-2xl shadow-2xl transition-colors"
                >
                    <img src={`/public/flag_${l==='mk'? 'en' : 'mk'}.png`}  className='w-10 h-10'/>
                </button>
                <MenuBook
                    l={l}
                    t={t}
                    categories={categories}
                    meals={meals}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    tableId={tableId}
                    onAddMeal={addMealToTable}
                    orderByTable={orderByTable}
                    onRemoveMeal={removeMealToTable}
                />
            </main>
        </div>
    );
}

export default Table;
//
// import {useState} from "react";
// import useCategories from "../../hooks/useCategories.js";
// import useMealsFromCategory from "../../hooks/useMealsFromCategory.js";
// import MenuBook from "./Menu.jsx";
// import {useParams} from "react-router";
// import useOrderByTable from "../../hooks/useOrderByTable.js";
//
// function Table() {
//     const [selectedCategory, setSelectedCategory] = useState(1);
//     const categories = useCategories();
//     const meals = useMealsFromCategory(selectedCategory);
//     const {tableId} = useParams();
//
//     return (
//         <div>
//             <main>
//                 <h1 className="text-center text-2xl font-bold">Masa {tableId}</h1>
//                 <MenuBook
//                     categories={categories}
//                     meals={meals}
//                     setSelectedCategory={setSelectedCategory}
//                     tableId={tableId}
//                 />
//             </main>
//         </div>
//     );
// }
//
// export default Table;
