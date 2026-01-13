import useMeals from "../../../hooks/useMeals.js";
import React, {useEffect, useState} from "react";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router";
import apiFetch from "../../../api/api.js";

const ListMeals = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState([''])
    const meals = useMeals(query)

    const handleRemove = async (mealId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this user?");
        if (!confirmDelete) return;

        try {
            await apiFetch(`/removeMeal/${mealId}/`,{
                method:"GET",
            })
            window.location.reload()
        } catch (err) {
            console.error(err);
            alert("Could not remove meal");
        }
    };
    useEffect(() => {
        document.title = "List Meals"
    }, []);


    return (
        <div className="flex justify-center px-3 sm:px-6">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-3 min-w-0">
                            <button
                                onClick={() => navigate("/admin")}
                                className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition duration-200"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>

                            <div className="shrink-0 p-2 bg-blue-100 rounded-lg">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 1a6 6 0 01-9-5.197"
                                    />
                                </svg>
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Meals</h2>
                                <p className="text-xs sm:text-sm text-gray-500">Total {meals.length} meals</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/admin/addMeal")}
                            className="w-full sm:w-auto justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                     bg-gradient-to-r from-green-50 to-green-100 border border-green-200
                     text-green-600 hover:from-green-100 hover:to-green-200 hover:border-green-300
                     hover:shadow-sm hover:text-green-700 active:scale-95
                     flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8" />
                                <circle cx="12" cy="12" r="9" />
                            </svg>
                            <span>Add Meal</span>
                        </button>
                    </div>
                </div>

                {/* SEARCH */}
                <div className="relative px-4 sm:px-6 py-4">
                    <input
                        type="text"
                        placeholder="Пребарувај со кирилица"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-11 rounded-xl shadow-sm
                   ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500
                   focus:outline-none transition-all"
                    />
                    <svg
                        className="absolute left-7 sm:left-9 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* LIST */}
                <div className="p-4 sm:p-6">
                    {meals.length === 0 ? (
                        <div className="text-center py-10">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                />
                            </svg>
                            <p className="text-gray-500 font-medium">No meals found</p>
                            <p className="text-sm text-gray-400 mt-1">Add a meal to get started</p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {meals.map(item => (
                                <li
                                    key={item.id}
                                    className="group bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-blue-50
                         border border-gray-200 hover:border-blue-200 rounded-xl p-3 sm:p-4 transition-all duration-200"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">{item.id}</span>
                                            </div>

                                            <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors truncate">
                                                {item.titleMK}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/editMeal/${item.id}`)}
                                                className="w-full sm:w-auto justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                               bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200
                               text-blue-600 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300
                               hover:shadow-sm hover:text-blue-700 active:scale-95
                               flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                           M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                                                    />
                                                </svg>
                                                <span>Edit</span>
                                            </button>

                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="w-full sm:w-auto justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                               bg-gradient-to-r from-red-50 to-red-100 border border-red-200
                               text-red-600 hover:from-red-100 hover:to-red-200 hover:border-red-300
                               hover:shadow-sm hover:text-red-700 active:scale-95
                               flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                           a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                           m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                <span>Remove</span>
                                            </button>
                                        </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>

    )
}

export default ListMeals

