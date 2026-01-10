import React, {useState, useEffect} from 'react';
import useCategories from "../../hooks/useCategories.js";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router";
import apiFetch from "../../api/api.js";

const RegisterUsers = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("")
        setError("")
        try {
            const formDataToSend = new FormData();
            for (const [key, value] of Object.entries(formData)) {
                if (value) {
                    formDataToSend.append(key, value)
                }
            }
            const data = await apiFetch('/register/', {
                method: 'POST',
                body: formDataToSend,
                credentials :false
            });
            // const data = await response.json();
            // if (!response.ok) {
            //     throw new Error(data.errors ? JSON.stringify(data.errors) : "Request failed");
            // }
            if (data.success) {
                setMessage("User Registered Successfully!")
                setFormData({
                    username: "",
                    password1: "",
                    password2: "",
                });
            }
        } catch (err) {
            console.log("Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Register User"
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-10 px-3 sm:px-6">
            <div className="max-w-md mx-auto">

                {/* Sticky top actions */}
                <div className="sticky top-0 z-10 -mx-3 sm:mx-0 mb-4 sm:mb-6">
                    <div
                        className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl px-3 sm:px-4 py-3 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                </svg>
                            </button>

                            <div className="min-w-0">
                                <p className="text-sm text-gray-500">Admin</p>
                                <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                    Create New User
                                </h1>
                            </div>

                            <div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Header inside card */}
                    <div
                        className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6 py-4 border-b border-gray-200">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl shrink-0">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-xl font-bold text-gray-800">Create New User</h2>
                                <p className="text-sm text-gray-500">Add a new user to the system</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">

                        {/* Success */}
                        {message && (
                            <div
                                className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                                <div className="flex items-center">
                                    <div
                                        className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <p className="text-green-800 font-medium">{message}</p>
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div
                                className="mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                                <div className="flex items-center">
                                    <div
                                        className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <p className="text-red-800 font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* ONE form */}
                        <form id="createUserForm" onSubmit={handleSubmit} className="space-y-5">

                            {/* Username */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
              <span className="flex items-center mb-2">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </span>
                Username
              </span>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="Enter username"
                                            className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition hover:border-gray-300"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-2">Unique username for the new user</p>
                                </label>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
              <span className="flex items-center mb-2">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </span>
                Password
              </span>

                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password1"
                                            value={formData.password1}
                                            onChange={handleInputChange}
                                            placeholder="Create a strong password"
                                            className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition hover:border-gray-300"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Confirm */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
              <span className="flex items-center mb-2">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </span>
                Confirm Password
              </span>

                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password2"
                                            value={formData.password2}
                                            onChange={handleInputChange}
                                            placeholder="Repeat the password"
                                            className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-gray-300"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Bottom submit (nice on mobile) */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-6 rounded-xl font-semibold text-base sm:text-lg transition-all
              flex items-center justify-center shadow-lg hover:shadow-xl active:scale-[0.99]
              ${loading
                                    ? "bg-gradient-to-r from-blue-400 to-blue-500 cursor-not-allowed text-white"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none"
                                             viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        Creating User...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                        </svg>
                                        Create User Account
                                    </>
                                )}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default RegisterUsers;