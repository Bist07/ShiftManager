// /hooks/useRoles.js
import { useState, useEffect } from 'react';
import { fetchRoles } from '../services/api/roleApi';
import { transformRoleData } from '../utils/roleUtils';

const useRoles = () => {
    const [roles, setRole] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndTransformRoles = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchRoles();
                const transformedData = transformRoleData(data);
                setRole(transformedData);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };


        fetchAndTransformRoles();

    }, []);

    return { roles, loading, error };
};

export default useRoles;