// /hooks/useAuth.js
import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';

const useAuth = () => {
    const { user, login, logout } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const loginUser = async (credentials) => {
        setLoading(true);
        try {
            // Call your login logic (e.g., API request)
            // For now, let's mock the login response
            login({ name: 'John Doe', email: 'john.doe@example.com' });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = () => {
        logout();
    };

    return { user, loading, loginUser, logoutUser };
};

export default useAuth;
