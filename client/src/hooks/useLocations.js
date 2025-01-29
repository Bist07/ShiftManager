// /hooks/useLocations.js
import { useState, useEffect } from 'react';
import { fetchLocations } from '../services/api';

const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getLocations = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchLocations();
            setLocations(data);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {


        getLocations();
    }, []);

    return { locations, loading, error };
};

export default useLocations;
