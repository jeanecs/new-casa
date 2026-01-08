import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // To prevent "flickering" redirects
    
    axios.defaults.withCredentials = true;

    const checkAuthStatus = async () => {
        try {
            // Call the protected route we made in backend
            const { data } = await axios.get('http://localhost:5000/api/admin/dashboard-data');
            if (data.success) {
                setIsAdminLoggedIn(true);
            }
        } catch (error) {
            setIsAdminLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AppContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn, loading }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;