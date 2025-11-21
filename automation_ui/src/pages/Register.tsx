import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerRequest({ fullName, email, password, role: 'SUB_ADMIN' }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.role === 'SUPER_ADMIN') {
                navigate('/super-admin/dashboard');
            } else if (user?.role === 'SUB_ADMIN') {
                navigate('/admin/dashboard');
            }
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans overflow-y-auto bg-slate-50/50">
            <div className="max-w-md w-full card-glass transform transition-all duration-300 my-4">
                <div className="gradient-header-secondary flex flex-col items-center py-4">
                    <div className="w-14 h-14 bg-white rounded-full p-1 shadow-lg mb-2 flex items-center justify-center overflow-hidden">
                        <img src="/assets/logo.jpg" alt="bsmartgen logo" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1 font-display text-glow">BSmartGen</h2>
                    <p className="text-secondary-100 text-sm">Create your account</p>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="alert-error mb-4">
                            <p className="font-semibold">Registration Failed</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wide">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="input-field-glow focus:border-secondary-500 focus:ring-secondary-300/50 focus:shadow-secondary-500/30"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wide">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field-glow focus:border-secondary-500 focus:ring-secondary-300/50 focus:shadow-secondary-500/30"
                                placeholder="user@example.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wide">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="input-field-glow focus:border-secondary-500 focus:ring-secondary-300/50 focus:shadow-secondary-500/30 pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-secondary-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Role selection removed, defaults to SUB_ADMIN */}

                        <button
                            type="submit"
                            className="w-full btn-secondary mt-6"
                        >
                            <span className="relative z-10">Register</span>
                        </button>
                    </form>
                </div>

                <div className="bg-gradient-to-r from-secondary-50/50 to-purple-50/50 p-4 text-center border-t-2 border-secondary-200/30 rounded-b-2xl">
                    <p className="text-xs text-slate-600 font-medium">
                        Already have an account? <Link to="/admin/login" className="text-secondary-600 hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
