import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/admin/logout', {}, { withCredentials: true });
            if (data.success) {
                navigate('/admin');
            }
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    // Styling for the active link
    const activeStyle = "text-casa-gold border-r-4 border-casa-gold pr-4";
    const baseStyle = "cursor-pointer hover:text-casa-gold transition-all duration-300 block";

    return (
        <div className="w-64 min-h-screen bg-casa-charcoal text-black p-8 flex flex-col justify-between fixed">
            <div>
                <h2 className="text-2xl font-serif-display mb-10 text-casa-gold tracking-tighter">Casa Filomena</h2>
                
                <nav className="space-y-8 text-xs uppercase tracking-[0.2em] font-medium">
                    <NavLink 
                        to="/admin-dashboard" 
                        className={({ isActive }) => isActive ? `${baseStyle} ${activeStyle}` : baseStyle}
                    >
                        Bookings
                    </NavLink>
                    
                    <NavLink 
                        to="/admin-villas" 
                        className={({ isActive }) => isActive ? `${baseStyle} ${activeStyle}` : baseStyle}
                    >
                        Villas
                    </NavLink>
                </nav>
            </div>

            <button 
                onClick={handleLogout}
                className="text-left text-xs uppercase tracking-widest text-gray-500 hover:text-red-400 transition-colors"
            >
                [ Sign Out ]
            </button>
        </div>
    );
};

export default AdminSidebar;