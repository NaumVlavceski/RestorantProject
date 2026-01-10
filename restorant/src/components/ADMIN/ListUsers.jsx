import React, {useEffect, useState} from "react";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router";
import apiFetch from "../../api/api.js";

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "List Users"
        apiFetch("/users/", {
            credentials: "include",
        })
            .then(data => setUsers(data))
            .catch(() => setError("Failed to load users"))
            .finally(() => setLoading(false));
    }, []);

    const handleRemove = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this user?");
        if (!confirmDelete) return;

        try {
            await apiFetch(`/remove_user/${userId}/`,{
                method:"GET",
                // credentials:"include",
            })
            setUsers(prev => prev.filter(u => u.id !== userId));
        } catch (err) {
            console.error(err);
            alert("Could not remove user");
        }
    };

    if (loading) return <p className="text-gray-500">Loading users...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex justify-center">

        <div className="w-5xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div>
                            <button onClick={()=>navigate("/admin")}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 1a6 6 0 01-9-5.197"/>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Users</h2>
                            <p className="text-sm text-gray-500">Total {users.length} users</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {users.length === 0 ? (
                    <div className="text-center py-10">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                        </svg>
                        <p className="text-gray-500 font-medium">No users found</p>
                        <p className="text-sm text-gray-400 mt-1">Add a user to get started</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {users.map(user => (
                            <li
                                key={user.id}
                                className="group bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-blue-50
                                 border border-gray-200 hover:border-blue-200 rounded-xl p-4 transition-all duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full
                                                  flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold">
                                            {user.username.charAt(0).toUpperCase()}
                                        </span>
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
                                                  ${user.is_active ? 'bg-green-500' : 'bg-gray-300'}`}/>
                                        </div>

                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                                                    {user.username}
                                                </p>
                                                {user.is_staff && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-100 to-indigo-100
                                                          text-purple-700 rounded-full border border-purple-200">
                                                Staff
                                            </span>
                                                )}
                                            </div>

                                            {user.email ? (
                                                <div className="flex items-center mt-1">
                                                    <svg className="w-4 h-4 text-gray-400 mr-1" fill="none"
                                                         stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                                    </svg>
                                                    <p className="text-sm text-gray-500 truncate max-w-xs">{user.email}</p>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-400 italic mt-1">No email provided</p>
                                            )}

                                            <div className="flex items-center space-x-3 mt-2">
                                        <span className={`text-xs px-2 py-1 rounded-full ${user.is_active
                                            ? 'bg-green-100 text-green-700 border border-green-200'
                                            : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                                {user.last_login && (
                                                    <span className="text-xs text-gray-400">
                                                Last login: {new Date(user.last_login).toLocaleDateString()}
                                            </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleRemove(user.id)}
                                        className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                                         bg-gradient-to-r from-red-50 to-red-100 border border-red-200
                                         text-red-600 hover:from-red-100 hover:to-red-200 hover:border-red-300
                                         hover:shadow-sm hover:text-red-700 active:scale-95
                                         flex items-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Footer with stats */}
            {users.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">Active: {users.filter(u => u.is_active).length}</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">Staff: {users.filter(u => u.is_staff).length}</span>
                            </div>
                        </div>
                        <div className="text-gray-500">
                            Showing all {users.length} users
                        </div>
                    </div>
                </div>
            )}
        </div>

        </div>
    );
};

export default ListUsers;
