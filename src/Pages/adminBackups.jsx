import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideBar from "../Components/adminSidebar.jsx";
import AdminNavbar from "../Components/adminNavbar.jsx";
import baseUrl from "../baseurl.js";
import "../CSS/responsive.css";

const AdminBackups = () => {
    const [serverBackups, setServerBackups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);
    const [pin, setPin] = useState("");
    const [isEmergencyLoading, setIsEmergencyLoading] = useState(false);

    const fetchServerBackups = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get(`${baseUrl}api/admin/server-backups`, {
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setServerBackups(response.data.data);
        } catch (err) {
            console.error("Error fetching server backups:", err);
            // If unauthorized or DB is down, show emergency login
            if (err.response?.status === 401 || err.response?.status === 403 || err.response?.status === 503) {
                setShowEmergency(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServerBackups();
    }, []);

    const handleEmergencyLogin = async (e) => {
        e.preventDefault();
        setIsEmergencyLoading(true);
        try {
            const response = await axios.post(`${baseUrl}api/admin/emergency-login`, { pin });
            const token = response.data.data.token;
            localStorage.setItem("adminToken", token);
            setShowEmergency(false);
            setPin("");
            fetchServerBackups();
        } catch (err) {
            alert(err.response?.data?.message || "Invalid Emergency PIN");
        } finally {
            setIsEmergencyLoading(false);
        }
    };

    const handleCreateSnapshot = async () => {
        setActionLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get(`${baseUrl}api/admin/backup`, {
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                responseType: 'blob'
            });

            // Trigger browser download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const date = new Date().toISOString().split('T')[0];
            link.setAttribute('download', `piet_backup_${date}.json`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            // Refresh the server list
            await fetchServerBackups();
            alert("Backup created successfully and saved to server!");
        } catch (err) {
            console.error("Error creating snapshot:", err);
            alert("Failed to create snapshot.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDownloadLocal = async (filename) => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get(`${baseUrl}api/admin/server-backups/${filename}`, {
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Error downloading file:", err);
            alert("Failed to download backup file.");
        }
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSideBar />
            <div className="flex-1">
                <AdminNavbar />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Database Backups</h1>
                            <p className="text-gray-500">Manage system snapshots and server-side archives</p>
                        </div>
                        <button 
                            onClick={handleCreateSnapshot}
                            disabled={actionLoading}
                            className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <i className={`fa-solid fa-camera mr-2 ${actionLoading ? 'animate-pulse' : ''}`}></i>
                            {actionLoading ? "Creating Snapshot..." : "Create New Snapshot"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold mb-4 flex items-center">
                                <i className="fa-solid fa-database text-blue-500 mr-2"></i>
                                Live Backup (Browser)
                            </h2>
                            <p className="text-sm text-gray-600 mb-6">
                                Instantly download the current database state from MongoDB as a JSON file. This requires an active database connection.
                            </p>
                            <button 
                                onClick={handleCreateSnapshot}
                                className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                            >
                                Download Live Backup
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-bold mb-4 flex items-center">
                                    <i className="fa-solid fa-hard-drive text-orange-500 mr-2"></i>
                                    Server-Side Protection
                                </h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Every snapshot you create is also stored on the server's hard drive. These backups are accessible even if MongoDB is offline.
                                </p>
                            </div>
                            <div className="flex items-center text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-100">
                                <i className="fa-solid fa-circle-info mr-2"></i>
                                Useful for disaster recovery when the database is unreachable.
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Available Server Snapshots</h3>
                            <button 
                                onClick={fetchServerBackups}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className={`fa-solid fa-rotate ${loading ? 'animate-spin' : ''}`}></i>
                            </button>
                        </div>
                        {loading ? (
                            <div className="p-12 text-center">
                                <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-gray-500">Scanning server directory...</p>
                            </div>
                        ) : serverBackups.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold">Filename</th>
                                            <th className="px-6 py-3 font-semibold text-center">Date Created</th>
                                            <th className="px-6 py-3 font-semibold text-center">Size</th>
                                            <th className="px-6 py-3 font-semibold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {serverBackups.map((file) => (
                                            <tr key={file.name} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-700 flex items-center">
                                                    <i className="fa-solid fa-file-code text-blue-400 mr-3"></i>
                                                    {file.name}
                                                </td>
                                                <td className="px-6 py-4 text-center text-gray-500">
                                                    {new Date(file.createdAt).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-center text-gray-500">
                                                    {formatSize(file.size)}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => handleDownloadLocal(file.name)}
                                                        className="text-orange-600 hover:text-orange-800 font-medium"
                                                    >
                                                        Download
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <i className="fa-solid fa-box-open text-gray-300 text-4xl mb-4"></i>
                                <p className="text-gray-500">No server-side snapshots found.</p>
                                <button 
                                    onClick={handleCreateSnapshot}
                                    className="text-orange-500 font-medium hover:underline mt-2"
                                >
                                    Create your first snapshot
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Emergency PIN Overlay */}
            {showEmergency && (
                <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="bg-orange-500 p-6 text-white text-center">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fa-solid fa-shield-halved text-3xl"></i>
                            </div>
                            <h2 className="text-xl font-bold">Two-Factor Authentication</h2>
                            <p className="text-orange-100 text-sm mt-2">
                                Emergency Recovery Mode
                            </p>
                        </div>
                        <form onSubmit={handleEmergencyLogin} className="p-8">
                            <p className="text-gray-600 text-sm mb-6 text-center">
                                Database is unreachable. Enter the 6-digit code from your <strong>Google Authenticator</strong> app to unlock server snapshots.
                            </p>
                            <div className="mb-6">
                                <input 
                                    type="text"
                                    maxLength="6"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    placeholder="000000"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-4xl tracking-[0.2em] font-mono outline-none transition-all"
                                    required
                                    autoFocus
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={isEmergencyLoading}
                                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center disabled:opacity-50"
                            >
                                {isEmergencyLoading ? (
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Unlock Backups"
                                )}
                            </button>
                            <button 
                                type="button"
                                onClick={() => window.location.href = "/admin/login"}
                                className="w-full mt-4 text-gray-500 text-sm hover:underline"
                            >
                                Return to Standard Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBackups;
