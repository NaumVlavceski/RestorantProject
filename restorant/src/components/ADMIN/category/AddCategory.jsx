import React, {useState, useEffect} from 'react';
import useCategories from "../../../hooks/useCategories.js";
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import apiFetch from "../../../api/api.js";

const AddCategoryForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        titleMK: '',
        photo: null
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Add Category"
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const formDataToSend = new FormData();

            // Додади ги сите полиња
            for (const [key, value] of Object.entries(formData)) {
                if (key !== 'photo' && value) {
                    formDataToSend.append(key, value);
                }
            }

            if (formData.photo) {
                formDataToSend.append('photo', formData.photo);
            }
            const data = await apiFetch(`/addCategory/`, {
                method: 'POST',
                body: formDataToSend,
                credentials :false
            });

            if (data.success) {
                setMessage('Category added successfully!');
                // Ресетирај го формуларот
                setFormData({
                    title: '',
                    titleMK: '',
                    photo: null
                });
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-10 px-3 sm:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Sticky top actions */}
                <div className="sticky top-0 z-10 -mx-3 sm:mx-0 mb-4 sm:mb-6">
                    <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl px-3 sm:px-4 py-3 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/categories")}
                                className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>

                            <div className="min-w-0">
                                <p className="text-sm text-gray-500">Додавање</p>
                                <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                    Нова категорија
                                </h1>
                            </div>

                            <div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                    {/* Top bar (optional, but keeps your style) */}
                    <div className="px-4 sm:px-8 py-5 bg-gradient-to-r from-white to-blue-50 border-b border-gray-100">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Додавање категорија</h2>
                    </div>

                    {/* Messages */}
                    <div className="px-4 sm:px-8 pt-6">
                        {message && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-green-800 font-medium">{message}</span>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-red-800 font-medium">{error}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ONE form */}
                    <form id="addCategoryForm" onSubmit={handleSubmit} className="px-4 sm:px-8 pb-8">
                        <div className="md:flex gap-8">

                            {/* LEFT */}
                            <div className="md:w-1/2 pt-2">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Основни информации</h3>
                                    <p className="text-sm text-gray-500">Наслови на категорија.</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center text-sm font-medium text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                            </svg>
                                            English Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            required={true}
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Burgers"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center text-sm font-medium text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                            Македонски Наслов
                                        </label>
                                        <input
                                            type="text"
                                            name="titleMK"
                                            required={true}
                                            value={formData.titleMK}
                                            onChange={handleInputChange}
                                            placeholder="на пр., Бургери"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="md:w-1/2 mt-8 md:mt-0">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Category Photo</h3>

                                    </div>

                                    <div className="flex justify-center px-6 pt-6 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition bg-white">
                                        <div className="space-y-2 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                />
                                            </svg>

                                            <div className="text-sm text-gray-600">
                                                <label className="cursor-pointer font-medium text-blue-600 hover:text-blue-500">
                                                    <span>Upload a file</span>
                                                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                                </label>
                                                <span className="text-gray-500"> or drag and drop</span>
                                            </div>

                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

                                            {formData.photo && (
                                                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-left">
                                                    <p className="text-sm text-blue-700">
                                                        Selected: <span className="font-medium">{formData.photo.name}</span>
                                                    </p>
                                                    <p className="text-xs text-blue-600 mt-1">
                                                        Size: {(formData.photo.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom submit (корисно на мобилен) */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all
                  ${loading
                                            ? "bg-blue-400 cursor-not-allowed text-white"
                                            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl text-white"
                                        }`}
                                    >
                                        {loading ? "Категоријата се додава..." : "Додади категорија во менито"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default AddCategoryForm;