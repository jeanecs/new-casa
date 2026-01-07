import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // We use the backend URL we tested in Postman
            const { data } = await axios.post('http://localhost:5000/api/admin/login', 
                { email, password },
                { withCredentials: true } // THIS IS VITAL for HttpOnly cookies!
            );
            
            if (data.success) {
                // Redirect to the dashboard (we'll build this next)
                window.location.href = '/admin-dashboard';
            }
        } catch (err) {
            alert(err.response?.data?.message || "Authentication failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-12 bg-white border border-casa-gold/30 shadow-2xl rounded-sm">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif-display text-casa-charcoal mb-2">Casa Filomena</h1>
                    <p className="text-casa-gold uppercase tracking-widest text-xs font-semibold">Admin Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-transparent border-b border-gray-300 focus:border-casa-gold outline-none transition-colors"
                            placeholder="manager@casafilomena.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Secure Password</label>
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-transparent border-b border-gray-300 focus:border-casa-gold outline-none transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-casa-charcoal text-white py-4 mt-4 hover:bg-casa-gold transition-all duration-500 font-serif-display text-lg shadow-lg"
                    >
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;