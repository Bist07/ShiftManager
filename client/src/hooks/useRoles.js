// /hooks/useRoles.js
import { useState, useEffect } from 'react';
import { fetchRoles } from '../services/api';
import mockData from '../mockData/roles.json';

const useRoles = () => {
    const [roles, setRole] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndTransformRoles = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchRoles();
            const finalData = data || mockData;
            setRole(finalData);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
            setRole(mockData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndTransformRoles();

    }, []);

    return { roles, loading, error };
};

export default useRoles;
