// /hooks/useLocations.js
import { useState, useEffect } from 'react';
import { fetchPreference } from '../services/api/preferenceApi';

const usePreference = () => {
    const [preference, setPreference] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPreference = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchPreference();
            setPreference(data);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {


        getPreference();
    }, []);

    return { preference, loading, error };
};

export default usePreference;
