import React, {useState, useEffect} from 'react';
import useCategories from "../../../hooks/useCategories.js";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {useNavigate, useParams} from "react-router";
import apiFetch from "../../../api/api.js";

const EditMealForm = () => {
    const categories = useCategories()
    const {mealId} = useParams()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "Edit Meal " + mealId
        apiFetch(`/editMeal/${mealId}/`)
            .then(data => setFormData(data))
    }, [mealId]);
    const [formData, setFormData] = useState([]);


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

        // Валидација
        if (!formData.Category) {
            setError('Please select a category');
            return;
        }

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

            const data = await apiFetch(`/editMeal/${mealId}/`, {
                method: 'POST',
                body: formDataToSend,
                credentials :false
            });

            // const data = await response.json();
            //
            // if (!response.ok) {
            //     throw new Error(data.errors ? JSON.stringify(data.errors) : 'Request failed');
            // }

            if (data.success) {
                navigate("/admin/meals")
                // Ресетирај го формуларот
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8 px-3 sm:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Sticky top actions */}
                <div className="sticky top-0 z-10 -mx-3 sm:mx-0 mb-4 sm:mb-6">
                    <div
                        className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl px-3 sm:px-4 py-3 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/meals")}
                                className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600"/>
                            </button>

                            <div className="min-w-0">
                                <p className="text-sm text-gray-500">Промени</p>
                                <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                    Јадење / пијалок
                                </h1>
                            </div>

                            <div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                {(message || error) && (
                    <div className="mb-4 sm:mb-6 space-y-3">
                        {message && (
                            <div
                                className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 font-medium">
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 font-medium">
                                {error}
                            </div>
                        )}
                    </div>
                )}

                <form id="editMealForm" onSubmit={handleSubmit}>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="md:flex">

                            {/* LEFT */}
                            <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
                                <div className="mb-5">
                                    <h2 className="text-lg font-semibold text-gray-900">Основни информации</h2>
                                    <p className="text-sm text-gray-500">Категорија, наслови и цени.</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Category */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Category *</label>
                                        <select
                                            name="Category"
                                            value={formData.Category}
                                            onChange={handleInputChange}
                                            required={true}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        >
                                            <option value="">Селектирај категорија</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.title} / {category.titleMK}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Titles */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">English Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                required={true}
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Chicken Burger"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Македонски
                                                Наслов</label>
                                            <input
                                                type="text"
                                                required={true}
                                                name="titleMK"
                                                value={formData.titleMK}
                                                onChange={handleInputChange}
                                                placeholder="на пр., Пилешки бургер"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            />
                                        </div>
                                    </div>

                                    {/* Prices */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Price (€)</label>
                                            <div className="relative">
                                                <span
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                                                <input
                                                    type="number"
                                                    inputMode="decimal"
                                                    step="0.01"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    placeholder="0.00"
                                                    required={true}
                                                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Цена (ден.)</label>
                                            <div className="relative">
                                                <span
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">ден.</span>
                                                <input
                                                    type="number"
                                                    inputMode="decimal"
                                                    step="0.01"
                                                    name="priceMK"
                                                    required={true}
                                                    value={formData.priceMK}
                                                    onChange={handleInputChange}
                                                    placeholder="0.00"
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div
                                className="md:w-1/2 bg-gray-50 p-4 sm:p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200">
                                <div className="mb-5">
                                    <h2 className="text-lg font-semibold text-gray-900">Опис и слика</h2>
                                    <p className="text-sm text-gray-500">Описи + фотографија за јадењето.</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Descriptions */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">English Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}

                                            placeholder="Describe the meal in English..."
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Македонски Опис</label>
                                        <textarea
                                            name="descriptionMK"
                                            value={formData.descriptionMK}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="Опишете го јадењето на македонски..."
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                                        />
                                    </div>

                                    {/* Photo */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Meal Photo</label>

                                        <div
                                            className="rounded-2xl border-2 border-dashed border-gray-300 bg-white hover:border-blue-400 transition">
                                            <div className="p-6 text-center">
                                                <div className="mx-auto mb-3 h-12 w-12 text-gray-400">
                                                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor">
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>

                                                <div className="text-sm text-gray-600">
                                                    <label
                                                        className="cursor-pointer font-medium text-blue-600 hover:text-blue-500">
                                                        Upload a file
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <span className="text-gray-500"> or drag and drop</span>
                                                </div>

                                                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>

                                                {formData.photo && (
                                                    <div className="mt-4 p-3 bg-blue-50 rounded-xl text-left">
                                                        <p className="text-sm text-blue-700">
                                                            Selected: <span
                                                            className="font-medium">{formData.photo.name}</span>
                                                        </p>
                                                        <p className="text-xs text-blue-600 mt-1">
                                                            Size: {(formData.photo.size / 1024).toFixed(2)} KB
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full text-white py-3 rounded-xl font-semibold transition-all
                  ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-sm active:scale-95"}`}
                                    >
                                        {loading ? "Зачувување..." : "Зачувај промени"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default EditMealForm;