// Login.jsx
import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import apiFetch from "../../api/api.js";

const Login = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        username: "",
        password: "",
    })
    const handleInputChange=(e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    // const api = axios.create({
    //     baseURL: 'http://localhost:8000',  // Django server
    //     withCredentials: true,  // 👈 Ова е најважно!
    // });
    useEffect(() => {
        document.title = "Login Page"
        apiFetch("/check-auth/", {
            credentials: "include",
        })
            .then((data) => {
                if(data.is_authenticated){
                    navigate("/user")
                }
            })
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const formDataToSend = new FormData();
            for (const [key,value] of Object.entries(formData)){
                if (value) {
                    formDataToSend.append(key, value)
                }
            }
            const data = await apiFetch("/login/", {
                method: "POST",
                body: {
                    username:formData.username,
                    password:formData.password,
                },
                credentials: "include",
            });
            // const response = await api.post('/login/', {
            //     username,
            //     password
            // });
            //
            // if (response.data.success) {
            //     console.log('Login successful', response.data);
            //     navigate('/user');  // Префрлање на /user
            // }
            if (data.success) {
                navigate('/user');
            }
        } catch (err) {
            console.log("RESPONSE:")
            setError(err.response || 'Login failed');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <LockClosedIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Најава</h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Корисничко име
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Внесете корисничко име"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Лозинка
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Внесете лозинка"
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Грешка при најава
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                        >
                            Најави се
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;