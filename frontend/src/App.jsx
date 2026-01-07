import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Pages & Components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Villas from './pages/Villas'; // Import your new page
import AdminLogin from './pages/AdminLogin'; // 1. Import the new page\import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; // Ensure this exists!


function AppContent() {
    const location = useLocation();
    
    // Define paths where the Guest Navbar should be hidden
    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <>
            {/* Only show Navbar if we are NOT on an admin page */}
            {!isAdminPage && <Navbar />}
            
            <div className="pages">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/villas" element={<Villas />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    {/* Future dashboard route */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
            </div>
        </>
    );
}

function App() {
    return (
        <div className="font-gideon text-gray-900 bg-casa-cream min-h-screen">
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </div>
    );
}

export default App;
