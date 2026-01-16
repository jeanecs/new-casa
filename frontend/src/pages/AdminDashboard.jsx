import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom'; // Import Outlet

const AdminDashboard = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            
            {/* Main Content Area - ml-64 offsets the fixed sidebar */}
            <div className="flex-1 ml-64 p-12">
                <header className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <p className="text-casa-gold text-xs uppercase tracking-widest mb-1">Management</p>
                        <h1 className="text-4xl font-serif-display text-casa-charcoal">Reservations</h1>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Status: Live</span>
                    </div>
                </header>
                {/* DYNAMIC CONTENT AREA */}
                {/* This will render Bookings or AdminVillas based on the URL */}
                <Outlet /> {/* Render nested routes here */}
            </div>
        </div>
    );
};

export default AdminDashboard;