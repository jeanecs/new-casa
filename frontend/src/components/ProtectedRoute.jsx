import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { isAdminLoggedIn, loading } = useContext(AppContext);

    // Show nothing (or a luxury loader) while checking auth status
    if (loading) return <div className="min-h-screen bg-casa-cream"></div>;

    if (!isAdminLoggedIn) {
        // If not logged in, kick them back to login
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute;