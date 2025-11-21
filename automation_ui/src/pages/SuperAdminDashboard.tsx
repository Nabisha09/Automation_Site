import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        templateId: '',
        limitEmailNumber: 0,
        status: '',
        nextStatus: '',
    });

    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/data');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/data', formData);
            fetchData();
            setFormData({ templateId: '', limitEmailNumber: 0, status: '', nextStatus: '' });
        } catch (error) {
            console.error('Error adding data', error);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/superadmin/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="max-w-6xl w-full card-glass transform transition-all duration-300">
                <div className="gradient-header-primary flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1 font-display text-glow">Super Admin Dashboard</h1>
                        <p className="text-primary-100">Welcome, {user?.fullName}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-all duration-200 font-semibold border border-white/30 hover:shadow-lg active:scale-95"
                    >
                        Logout
                    </button>
                </div>

                <div className="p-8">
                    <section className="mb-10">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
                            <h3 className="text-xl font-bold text-slate-800">Add New Data</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 bg-white/40 p-6 rounded-xl border border-white/50 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Template ID</label>
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
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Limit</label>
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
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Status</label>
                                    <input
                                        name="status"
                                        placeholder="Status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field-glow"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Next Status</label>
                                    <input
                                        name="nextStatus"
                                        placeholder="Next Status"
                                        value={formData.nextStatus}
                                        onChange={handleInputChange}
                                        className="input-field-glow"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="btn-primary px-8"
                                >
                                    <span className="relative z-10">Add Data</span>
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="data-list-section">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                            <h3 className="text-xl font-bold text-slate-800">All Data Records</h3>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-lg bg-white/60 backdrop-blur-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                                        <th className="p-4 font-bold text-sm uppercase tracking-wider">ID</th>
                                        <th className="p-4 font-bold text-sm uppercase tracking-wider">Template ID</th>
                                        <th className="p-4 font-bold text-sm uppercase tracking-wider">Limit</th>
                                        <th className="p-4 font-bold text-sm uppercase tracking-wider">Status</th>
                                        <th className="p-4 font-bold text-sm uppercase tracking-wider">Next Status</th>
                                        <th className="p-4 font-bold text-sm uppercase tracking-wider">Created By</th>
                                        <th className="p-4 font-bold text-sm uppercase tracking-wider">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {data.map((item) => (
                                        <tr key={item.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                                            <td className="p-4 font-medium text-slate-600">#{item.id}</td>
                                            <td className="p-4 font-semibold text-slate-800">{item.templateId}</td>
                                            <td className="p-4 text-slate-600">{item.limitEmailNumber}</td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-500">{item.nextStatus || '-'}</td>
                                            <td className="p-4 text-slate-700 font-medium">{item.createdByUser?.fullName}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold border ${item.createdByUser?.role === 'SUPER_ADMIN'
                                                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                                                    : 'bg-purple-100 text-purple-700 border-purple-200'
                                                    }`}>
                                                    {item.createdByUser?.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500 italic">
                                                No data records found. Start by adding some data above.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                <div className="bg-gradient-to-r from-primary-50/50 to-blue-50/50 p-4 text-center border-t-2 border-primary-200/30 rounded-b-2xl">
                    <p className="text-xs text-slate-600 font-medium">
                        🛡️ Super Admin Control Panel • Full Access
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
