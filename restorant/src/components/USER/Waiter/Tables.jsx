import {useEffect, useState} from "react";
import useTables from "../../../hooks/useTables.js";
import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function Tables() {
    const [query, setQuery] = useState("");
    const tables = useTables(query);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Tables"
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8 px-3 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Sticky header (Back + Search) */}
                <div className="sticky top-0 z-10 -mx-3 sm:mx-0 mb-4 sm:mb-8">
                    <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl px-3 sm:px-5 py-3 shadow-sm">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/user/")}
                                className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-500">Изберете маса</p>
                                <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Маси</h1>
                            </div>

                            {/* Search */}
                            <div className="relative w-40 sm:w-72 md:w-96">
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
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

                                <input
                                    type="text"
                                    placeholder="Пребарај..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title + subtitle (non-sticky) */}
                <div className="text-center sm:text-left mb-4 sm:mb-6">
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Маси</h2>
                    <p className="text-gray-600 text-sm sm:text-lg">
                        Изберете маса за да започнете нарачка
                    </p>
                </div>

                {/* Grid */}
                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4">
                        {tables.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigate(`table/${item.id}`)}
                                className="
              flex flex-col items-center justify-center
              rounded-xl border-2 border-gray-200
              bg-gradient-to-b from-gray-50 to-white
              text-gray-800 font-semibold
              h-22 sm:h-28
              transition-all duration-300
              hover:from-blue-50 hover:to-white
              hover:border-blue-300 hover:shadow-lg hover:scale-[1.02]
              active:scale-95
              group
            "
                            >
                                <div className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                                    {item.id}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 mt-1 group-hover:text-blue-500">
                                    Маса
                                </div>

                                {/* Status */}
                                {item.status && (
                                    <div
                                        className={`mt-2 px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                                            item.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {item.status === "active" ? "Активна" : "Слободна"}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tables;