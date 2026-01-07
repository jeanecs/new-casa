import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="flex">
            {/* Simple Admin Sidebar */}
            <div className="w-64 min-h-screen bg-casa-charcoal text-white p-8">
                <h2 className="text-2xl font-serif-display mb-10 text-casa-gold">Casa Filomena</h2>
                <nav className="space-y-6 text-sm uppercase tracking-widest">
                    <p className="cursor-pointer hover:text-casa-gold">Bookings</p>
                    <p className="cursor-pointer hover:text-casa-gold">Villas</p>
                    <p className="cursor-pointer hover:text-casa-gold">Logout</p>
                </nav>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 p-12 bg-white">
                <h1 className="text-3xl font-serif-display border-b border-gray-100 pb-4">Reservations Overview</h1>
                <div className="mt-8 p-10 border border-dashed border-gray-200 text-center text-gray-400">
                    No bookings to display yet.
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;