import useOrders from "../../../hooks/useOrders.js";
import finishOrder from "../../../hooks/finishOrder.js";
import { useEffect, useState, useRef } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function Orders() {
    const orders = useOrders();
    const [highlightedTables, setHighlightedTables] = useState({});
    const [checkedTables, setCheckedTables] = useState({});
    const [changedMeals, setChangedMeals] = useState({});
    const prevOrdersRef = useRef([]);

    useEffect(() => {
        document.title = "Orders"
        // ... (постоечки useEffect код останува ист) ...
        if (orders.length === 0) {
            prevOrdersRef.current = [];
            setChangedMeals({});
            return;
        }

        if (prevOrdersRef.current.length === 0) {
            prevOrdersRef.current = JSON.parse(JSON.stringify(orders));
            return;
        }

        const newHighlights = {};
        const newChangedMeals = {};

        orders.forEach(order => {
            const prevOrder = prevOrdersRef.current.find(prev => prev.table === order.table);
            const tableChangedMeals = {};

            if (prevOrder) {
                order.meals.forEach(meal => {
                    const prevMeal = prevOrder?.meals?.find(m => m.titleMK === meal.titleMK);
                    if (!prevMeal) {
                        tableChangedMeals[meal.titleMK] = true;
                        newHighlights[order.table] = true;
                    }
                    else if (prevMeal.count !== meal.count) {
                        tableChangedMeals[meal.titleMK] = true;
                        newHighlights[order.table] = true;
                    }
                });
                //Proverka za odstraneti jadenja ova nemoze
                prevOrder.meals.forEach(prevMeal => {
                    const currentMeal = order.meals.find(m => m.titleMK === prevMeal.titleMK);
                    if (!currentMeal) {
                        newHighlights[order.table] = true;
                    }
                });
            } else {
                order.meals.forEach(meal => {
                    tableChangedMeals[meal.titleMK] = true;
                });
                newHighlights[order.table] = true;
            }

            if (Object.keys(tableChangedMeals).length > 0) {
                newChangedMeals[order.table] = tableChangedMeals;
            }
        });

        if (Object.keys(newHighlights).length > 0) {
            setHighlightedTables(prev => ({ ...prev, ...newHighlights }));
        }

        if (Object.keys(newChangedMeals).length > 0) {
            setChangedMeals(prev => {
                const updated = { ...prev };
                Object.keys(newChangedMeals).forEach(table => {
                    updated[table] = {
                        ...updated[table],
                        ...newChangedMeals[table]
                    };
                });
                return updated;
            });
        }

        prevOrdersRef.current = JSON.parse(JSON.stringify(orders));
    }, [orders]);

    const handleProvereno = (tableId) => {
        setHighlightedTables(prev => ({
            ...prev,
            [tableId]: false
        }));

        setChangedMeals(prev => {
            const newState = { ...prev };
            delete newState[tableId];
            return newState;
        });

        setCheckedTables(prev => ({
            ...prev,
            [tableId]: true
        }));

        setTimeout(() => {
            setCheckedTables(prev => ({
                ...prev,
                [tableId]: false
            }));
        }, 2000);
    };

    const handleFinish = async (tableId) => {
        await finishOrder(tableId);
        setHighlightedTables(prev => ({
            ...prev,
            [tableId]: false
        }));
        setCheckedTables(prev => ({
            ...prev,
            [tableId]: false
        }));

        setChangedMeals(prev => {
            const newState = { ...prev };
            delete newState[tableId];
            return newState;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8 px-3 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Sticky Header */}
                <div className="sticky top-0 z-10 -mx-3 sm:mx-0 mb-4 sm:mb-6">
                    <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl px-3 sm:px-5 py-3 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>

                            <div className="min-w-0">
                                <p className="text-sm text-gray-500">Управување</p>
                                <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                    Нарачки
                                </h1>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 ">
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                                    <div className="text-xs sm:text-sm text-gray-500 font-medium">Активни нарачки</div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{orders.length}</div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                                    <div className="text-xs sm:text-sm text-gray-500 font-medium">Нови промени</div>
                                    <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                                        {Object.keys(highlightedTables).filter(k => highlightedTables[k]).length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title + subtitle */}

                {/* Stats */}


                {/* Empty state */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-10 sm:p-12 text-center border border-gray-100">
                        <div className="max-w-md mx-auto">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Нема активни нарачки</h3>
                            <p className="text-gray-600 mb-6">Моментално нема активни нарачки. Сите маси се слободни.</p>
                        </div>
                    </div>
                ) : (
                    /* Orders grid (mobile-first) */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                        {orders.map(order => {
                            const isHighlighted = highlightedTables[order.table];
                            const isChecked = checkedTables[order.table];
                            const tableChangedMeals = changedMeals[order.table] || {};

                            return (
                                <div
                                    key={order.table}
                                    className={`
                bg-white rounded-2xl overflow-hidden
                transition-all duration-300
                ${isHighlighted
                                        ? "border-2 border-yellow-400 shadow-xl"
                                        : isChecked
                                            ? "border-2 border-green-400 shadow-md"
                                            : "border border-gray-200 shadow-sm"
                                    }
              `}
                                >
                                    {/* Card header */}
                                    <div
                                        className={`
                  p-4 border-b
                  ${isHighlighted
                                            ? "bg-yellow-50 border-yellow-100"
                                            : isChecked
                                                ? "bg-green-50 border-green-100"
                                                : "bg-gray-50 border-gray-100"
                                        }
                `}
                                    >
                                        <div className="flex justify-between items-center gap-3">
                                            <div className="flex items-center min-w-0">
                                                <div
                                                    className={`
                        w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                        ${isHighlighted
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : isChecked
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }
                      `}
                                                >
                                                    <span className="font-bold text-lg">{order.table}</span>
                                                </div>

                                                <div className="ml-3 min-w-0">
                                                    <h3 className="font-bold text-gray-900 truncate">Маса {order.table}</h3>
                                                    <p className="text-sm text-gray-500">{order.meals.length} ставки</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-1 shrink-0">
                                                {isHighlighted && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 animate-pulse">
                        НОВА ПРОМЕНА!
                      </span>
                                                )}
                                                {isChecked && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        ✓ ПРОВЕРЕНО
                      </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="p-4">
                                        <div className="mb-4 max-h-48 overflow-y-auto pr-1">
                                            {order.meals.map((meal, index) => {
                                                const isMealChanged = tableChangedMeals[meal.titleMK];

                                                return (
                                                    <div
                                                        key={`${order.table}-${meal.titleMK}`}
                                                        className={`
                          flex justify-between items-center py-3 px-3 rounded-lg
                          ${isMealChanged ? "bg-red-50 border border-red-100" : "hover:bg-gray-50"}
                          ${index !== 0 ? "border-t border-gray-100" : ""}
                        `}
                                                    >
                                                        <div className="flex-1 min-w-0">
                          <span className={`font-medium ${isMealChanged ? "text-red-700" : "text-gray-900"}`}>
                            {index + 1}. {meal.titleMK}
                          </span>

                                                            {meal.descriptionMK && (
                                                                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                                                    {meal.descriptionMK}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <span className={`font-bold text-lg ml-3 ${isMealChanged ? "text-red-600 animate-pulse" : "text-gray-900"}`}>
                          {meal.count}x
                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                                <span className="text-gray-600 font-medium">Вкупно:</span>
                                                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      {order.total_price} ден.
                    </span>
                                            </div>

                                            {order.payment_method && (
                                                <div
                                                    className={`
                        p-3 rounded-lg flex items-center justify-center
                        ${order.payment_method === "cash"
                                                        ? "bg-green-50 border border-green-200"
                                                        : "bg-blue-50 border border-blue-200"
                                                    }
                      `}
                                                >
                                                    {order.payment_method === "cash" ? (
                                                        <>
                                                            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span className="text-green-700 font-medium">Плаќање во готово</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                            </svg>
                                                            <span className="text-blue-700 font-medium">Плаќање со картичка</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={() => handleProvereno(order.table)}
                                                className={`
                      w-full py-3 px-4 rounded-lg font-semibold
                      transition flex items-center justify-center
                      ${isHighlighted
                                                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }
                    `}
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                ПРОМЕНИТЕ СЕ ПРОВЕРЕНИ
                                            </button>

                                            <button
                                                onClick={() => handleFinish(order.table)}
                                                className="
                      w-full py-3 px-4 rounded-lg font-semibold
                      bg-gradient-to-r from-blue-600 to-blue-700
                      text-white hover:from-blue-700 hover:to-blue-800
                      transition flex items-center justify-center
                      hover:shadow-lg
                    "
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                Заврши нарачка
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>

    );
}

export default Orders;