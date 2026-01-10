import {useParams} from "react-router";
import useOrderBySingleTable from "../../hooks/useOrderBySingleTable.js";
import {useNavigate} from "react-router-dom";
import useOrderMeal from "../../hooks/useOrderMeal.js";
import useYourOrder from "../../hooks/useYourOrder.js";
import {useEffect, useState} from "react";
import {useLanguage} from "../LanguageContext.jsx";
import apiFetch from "../../api/api.js";

function Order() {
    const navigate = useNavigate();
    const {tableId} = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);

    const orderByTable = useOrderBySingleTable(tableId);
    const yourOrder = useYourOrder(tableId);
    const addOrder = useOrderMeal(tableId);
    const {l, setL, t} = useLanguage()

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

    const handlePayment = async (paymentMethod) => {
        setSelectedPayment(paymentMethod)
        setIsWaiting(true);
        try {
            await apiFetch(`/set_payment/${tableId}/`, {
                method: "POST",
                body: {payment_method: paymentMethod},
                expectResponse: false,
                // ако ти треба session/cookies за да се зачува по корисник/маса:
                credentials: false,
            });
        } catch (e) {
            console.error("set_payment failed:", e);
        }
    };

    useEffect(() => {
        document.title = "Order " + tableId
        apiFetch(`/get_payment/${tableId}/`)
            .then(data => {
                if (data[0].payment_method) {
                    setSelectedPayment(data[0].payment_method);
                    setIsWaiting(true)
                }
            });
    }, [tableId]);

    return (
        <section className="relative py-6 w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <button
                onClick={() => setL(l === 'mk' ? 'en' : 'mk')}
                className="cursor-pointer absolute top-2 left-2 z-50
                text-white rounded-2xl shadow-2xl transition-colors"
            >
                <img src={`/public/flag_${l === 'mk' ? 'en' : 'mk'}.png`} className='w-10 h-10'/>
            </button>
            {/* Декоративни елементи */}
            <div
                className="absolute inset-0 bg-[url('/menu-bg-small.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>
            <div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>

            {/* Заглавие */}
            <div className="relative px-4 mb-8">
                <h1 className="text-center text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
                    {t.your_order}
                </h1>
                <p className="text-center text-gray-300 text-lg md:text-xl">
                    {t.table} {tableId} • {t.check_send}
                </p>
            </div>

            {/* Waiting Overlay */}
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

            {/* Главна содржина */}
            <div className="relative px-4 mb-24 max-w-6xl mx-auto">
                {/* Карти за нарачка */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Активна нарачка */}
                    <div
                        className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-white text-2xl font-bold flex items-center">
                                <svg className="w-6 h-6 mr-2 text-yellow-400" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                                {t.current_order}
                            </h2>
                        </div>

                        {orderByTable.meals && orderByTable.meals.length > 0 ? (
                            <div className="space-y-4">
                                {orderByTable.meals.map(item => (
                                    <div key={item.id}
                                         className="flex items-center justify-between bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800/70 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="text-white font-semibold">
                                                {l === 'mk' ? item.titleMK : item.title}</h3>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="text-center">
                                                <div className="text-yellow-400 font-bold text-xl">{item.count}x</div>
                                                <div className="text-gray-400 text-xs">{t.quantity}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-bold">
                                                    {l === 'mk' ? <span>{(item.priceMK * item.count)} ден</span> :
                                                        <span> {(item.price * item.count).toFixed(2)} €</span>}
                                                </div>
                                                <div className="text-gray-400 text-xs"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Вкупно за активна нарачка */}
                                <div className="border-t border-gray-700 pt-4 mt-4">
                                    <div className="flex justify-between text-lg">
                                        <span className="text-gray-300">{t.total}:</span>
                                        <div className="text-right">
                                            <div className="text-yellow-400 font-bold text-xl">
                                                {l === 'mk' ?
                                                    <span>{orderByTable.meals.reduce((total, item) => total + (item.priceMK * item.count), 0)} ден</span> :
                                                    <span>{orderByTable.meals.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2)} €</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <div className="text-gray-400 mb-4">{t.no_active_order}</div>
                                <div className="text-gray-500 text-sm">{t.add_meals_from_menu}</div>
                            </div>
                        )}
                    </div>
                    {/* Претходни нарачки */}
                    <div
                        className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-white text-2xl font-bold flex items-center">
                                <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M5 13l4 4L19 7"></path>
                                </svg>
                                {t.orders_sand}
                            </h2>
                        </div>

                        {yourOrder.meals && yourOrder.meals.length > 0 ? (
                            <div className="space-y-4">
                                {yourOrder.meals.map(ordered => (
                                    <div key={ordered.id}
                                         className="flex items-center justify-between bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800/70 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="text-white font-semibold">{l === 'mk' ? ordered.titleMK : ordered.title}</h3>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="text-center">
                                                <div className="text-green-400 font-bold text-xl">{ordered.count}x</div>
                                                <div className="text-gray-400 text-xs">{t.quantity}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-bold">
                                                    {l === 'mk' ? <span>{(ordered.priceMK * ordered.count)} ден</span> :
                                                        <span>{(ordered.price * ordered.count).toFixed(2)} €</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Вкупно за испратени нарачки */}
                                <div className="border-t border-gray-700 pt-4 mt-4">
                                    <div className="flex justify-between text-lg">
                                        <span className="text-gray-300">{t.total}:</span>
                                        <div className="text-right">
                                            <div className="text-green-400 font-bold text-xl">
                                                {l === 'mk' ? <span>{yourOrder.total_price || 0} ден </span> :
                                                    <span>{yourOrder.total_price ? Number(yourOrder.total_price / 60).toFixed(2) : '0.00'} €</span>}
                                            </div>
                                            <div className="text-gray-400 text-sm">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <div className="text-gray-400 mb-4">{t.no_orders_yet}</div>
                                <div className="text-gray-500 text-sm">{t.submit_order_desc}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Акции копчиња */}
                <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Копче назад */}
                        <button
                            className="group bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 cursor-pointer text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-gray-600"
                            onClick={() => navigate(`/table/${tableId}`)}
                        >
                            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            <span>{t.back_to_menu}</span>
                        </button>

                        {/* Копче за испраќање */}
                        <button
                            className={`group font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-center space-x-3 transition-all duration-300 ${orderByTable.meals && orderByTable.meals.length > 0
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer hover:scale-[1.02] active:scale-95 text-white'
                                : 'bg-gray-800 cursor-not-allowed text-gray-400 border border-gray-700'}`}
                            onClick={handleSubmit}
                            disabled={isSubmitting || !(orderByTable.meals && orderByTable.meals.length > 0)}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>{t.sending}</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                    </svg>
                                    <span>{t.send_order}</span>
                                </>
                            )}
                        </button>

                        {/* Информација за испратени */}
                        <div
                            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                            <div className="text-center">
                                <div className="text-gray-400 text-sm">{t.total_sent}</div>
                                <div className="text-2xl font-bold text-white">
                                    {yourOrder.meals?.length || 0}
                                </div>
                                <div className="text-gray-500 text-xs mt-1">{t.meals}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Плаќање секција - само ако има испратени нарачки */}
                {yourOrder.meals && yourOrder.meals.length > 0 && (
                    <div
                        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-white text-2xl font-bold mb-2">{t.payment_method}</h2>
                                <p className="text-gray-400">{t.choose_payment}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Cash плаќање */}
                            <button
                                className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${selectedPayment === "cash"
                                    ? 'border-green-500 bg-green-500/10 scale-105'
                                    : 'border-gray-600 hover:border-green-400 hover:bg-gray-800/50'}`}
                                onClick={() => handlePayment("cash")}
                                disabled={isWaiting}
                            >
                                <div className="mb-4">
                                    <div
                                        className={`p-4 rounded-full ${selectedPayment === "cash" ? 'bg-green-500/20' : 'bg-gray-700'}`}>
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-white font-bold text-xl mb-2">{t.cash}</h3>
                                <p className="text-gray-400 text-center text-sm">{t.cash_desc}</p>
                            </button>

                            {/* Card плаќање */}
                            <button
                                className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${selectedPayment === "card"
                                    ? 'border-blue-500 bg-blue-500/10 scale-105'
                                    : 'border-gray-600 hover:border-blue-400 hover:bg-gray-800/50'}`}
                                onClick={() => handlePayment("card")}
                                disabled={isWaiting}
                            >
                                <div className="mb-4">
                                    <div
                                        className={`p-4 rounded-full ${selectedPayment === "card" ? 'bg-blue-500/20' : 'bg-gray-700'}`}>
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-white font-bold text-xl mb-2">{t.card}</h3>
                                <p className="text-gray-400 text-center text-sm">{t.card_desc}</p>
                            </button>
                        </div>

                        {/* Информација за плаќање */}
                        <div className="border-t border-gray-700 pt-6">
                            <div className="text-center text-gray-400 text-sm">
                                {/*{selectedPayment ? (*/}
                                {/*    <div className="flex items-center justify-center space-x-2">*/}
                                {/*        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                                {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>*/}
                                {/*        </svg>*/}
                                {/*        <span>Избрано е плаќање со {selectedPayment === "cash" ? "готово" : "картичка"}. Придржувајте се во близина.</span>*/}
                                {/*    </div>*/}
                                {/*) : (*/}
                                {/*    ``*/}
                                {/*)}*/}
                                {t.select_payment}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </section>
    );
}


export default Order;