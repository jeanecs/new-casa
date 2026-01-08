import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

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

                <div className="mt-12">
                    {/* This is where your table will go */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-sm p-20 text-center">
                        <div className="inline-block p-4 rounded-full bg-casa-cream mb-4">
                            <svg className="w-8 h-8 text-casa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-casa-charcoal font-serif-display text-xl">No active bookings</p>
                        <p className="text-gray-400 text-sm mt-2">When guests book a villa, they will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;