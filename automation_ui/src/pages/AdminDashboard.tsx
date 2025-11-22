import React, { useState } from 'react';
import api from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const [formData, setFormData] = useState({
        templateId: '',
        limitEmailNumber: 0,
        status: '',
        nextStatus: '',
    });

    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/data', formData);
            alert('Data added successfully');
            setFormData({ templateId: '', limitEmailNumber: 0, status: '', nextStatus: '' });
        } catch (error) {
            console.error('Error adding data', error);
            alert('Failed to add data');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="max-w-2xl w-full card-glass transform transition-all duration-300 animate-float">
                <div className="gradient-header-secondary flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1 font-display text-glow">Admin Dashboard</h1>
                        <p className="text-secondary-100">Welcome, {user?.fullName}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-all duration-200 font-semibold border border-white/30 hover:shadow-lg active:scale-95"
                    >
                        Logout
                    </button>
                </div>

                <div className="p-10">
                    <section className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-1 h-8 bg-secondary-500 rounded-full"></div>
                            <h3 className="text-xl font-bold text-slate-800">Add New Data</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block uppercase tracking-wide">Template ID</label>
                                    <input
                                        name="templateId"
                                        placeholder="e.g., TMP-123"
                                        value={formData.templateId}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field-glow"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block uppercase tracking-wide">Limit Email Number</label>
                                    <input
                                        name="limitEmailNumber"
                                        type="number"
                                        placeholder="0"
                                        value={formData.limitEmailNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field-glow"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block uppercase tracking-wide">Status</label>
                                    <input
                                        name="status"
                                        placeholder="Current Status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field-glow"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block uppercase tracking-wide">Next Status</label>
                                    <input
                                        name="nextStatus"
                                        placeholder="Next Status"
                                        value={formData.nextStatus}
                                        onChange={handleInputChange}
                                        className="input-field-glow"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-secondary mt-4"
                            >
                                <span className="relative z-10">Add Data</span>
                            </button>
                        </form>
                    </section>
                </div>

                <div className="bg-gradient-to-r from-secondary-50/50 to-purple-50/50 p-4 text-center border-t-2 border-secondary-200/30 rounded-b-2xl">
                    <p className="text-xs text-slate-600 font-medium">
                        ⚡ Automation Control Center
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
