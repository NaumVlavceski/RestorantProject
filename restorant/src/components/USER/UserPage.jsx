import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    UserCircleIcon,
    TableCellsIcon,
    ClipboardDocumentListIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import apiFetch from "../../api/api.js";

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Welcome"
        apiFetch("/check-auth/", {
            credentials: "include",
        })
            // .then((res) => res.json())
            .then((data) => {
                if (!data.is_authenticated) {
                    navigate("/login");
                } else {
                    setUser(data.username);
                    if (data.is_staff) {
                        setAdmin(true);
                    }
                }
                setLoading(false);
            })
            .catch(() => {
                navigate("/login");
            });
    }, [navigate]);

    // const handleLogout = async () => {
    //     // try {
    //     //     await apiFetch("/logout/", {
    //     //         credentials: "include",
    //     //         // headers: { "Content-Type": "application/json" },
    //     //     });
    //     //     navigate("/login");
    //     // } catch (error) {
    //     //     console.error("Logout error:", error);
    //     // }
    //     localStorage.removeItem("access");
    //     localStorage.removeItem("refresh");
    //     navigate("/login");
    // };
    const handleLogout = async () => {
        try {
            await apiFetch("/logout/", {
                method: "POST",
                body: { refresh: localStorage.getItem("refresh") },
            });
        } catch (e) {}

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <UserCircleIcon className="h-8 w-8 text-blue-600"/>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Добредојдовте</h1>
                                <p className="text-sm text-gray-600">{user}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
                        >
                            <ArrowRightOnRectangleIcon className="h-5 w-5"/>
                            <span>Одјави се</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tables Card */}
                    <div
                        onClick={() => navigate("tables")}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition duration-200 cursor-pointer group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition duration-200">
                                <TableCellsIcon className="h-8 w-8 text-blue-600"/>
                            </div>
                            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">→</span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Маси</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Преглед и управување со масите во ресторанот
                        </p>
                    </div>

                    {/* Orders Card */}
                    <div
                        onClick={() => navigate("orders")}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition duration-200 cursor-pointer group"
                    >
                        <div className="flex items-start justify-between">
                            <div
                                className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition duration-200">
                                <ClipboardDocumentListIcon className="h-8 w-8 text-green-600"/>
                            </div>
                            <span className="text-sm font-medium text-green-600 group-hover:text-green-700">→</span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Нарачки</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Преглед и управување со нарачките
                        </p>
                    </div>

                    {/* Admin Card */}
                    {admin && (
                        <div
                            onClick={() => navigate("/admin")}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-purple-300 transition duration-200 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition duration-200">
                                    <Cog6ToothIcon className="h-8 w-8 text-purple-600"/>
                                </div>
                                <span
                                    className="text-sm font-medium text-purple-600 group-hover:text-purple-700">→</span>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900">Администрација</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Административни функции и подесувања
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UserPage;