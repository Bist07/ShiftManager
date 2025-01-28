// /hooks/useLocations.js
import { useState, useEffect } from 'react';
import { fetchPreference } from '../services/api';
import mockData from '../mockData/preference.json';

const usePreference = () => {
    const [preference, setPreference] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPreference = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchPreference();
            const finalData = data || mockData;
            setPreference(finalData);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
            setPreference(mockData);
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
