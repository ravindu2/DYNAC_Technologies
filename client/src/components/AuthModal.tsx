
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmpassword, setshhowconfirmpassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (type === 'signup') {
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }

                await axios.post('http://localhost:5000/auth/signup', {
                    email: formData.email,
                    name: formData.name,
                    password: formData.password,
                    role: formData.role,
                });

                alert('Signup successful!');
            } else if (type === 'signin') {
                const response = await axios.post('http://localhost:5000/auth/signin', {
                    email: formData.email,
                    password: formData.password,
                });

                const { token } = response.data;
                localStorage.setItem('authToken', token);
                alert('Signin successful!');
            }

            navigate('/dashboard');
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setshhowconfirmpassword((prev) => !prev);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg">
                <button
                    onClick={onClose}
                    className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="mb-6 text-2xl font-bold text-center">
                    {type === 'signin' ? 'Sign In' : 'Sign Up'}
                </h2>

                {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {type === 'signup' && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B7BBFF]"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B7BBFF]"
                            required
                        />
                    </div>

                    {type === 'signup' && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B7BBFF]"
                                required
                            >
                                <option value="" disabled>Select your role</option>
                                <option value="trainer">Trainer</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B7BBFF] pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                                )}
                            </button>
                        </div>
                    </div>

                    {type === 'signup' && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className='relative'>
                            <input
                                type={showconfirmpassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B7BBFF]"
                                required
                            /><button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                        >
                            {showconfirmpassword ? (
                                <EyeOff className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                            ) : (
                                <Eye className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                            )}
                        </button>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#B7BBFF] text-[#191B37] py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-200"
                    >
                        {type === 'signin' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
