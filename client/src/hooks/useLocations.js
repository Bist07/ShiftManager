// /hooks/useShifts.js
import { useState, useEffect } from 'react';
import { fetchLocations } from '../services/api/locationApi';

const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const getLocations = async () => {
            try {
                const data = await fetchLocations();
                setLocations(data);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        getLocations();
    }, []);

    return { locations, loading, error };
};

export default useLocations;
