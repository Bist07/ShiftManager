// /hooks/useLocations.js
import { useState, useEffect } from 'react';
import { fetchLocations } from '../services/api';
import mockData from '../mockData/locations.json';
const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getLocations = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchLocations();
            const finalData = data || mockData;
            setLocations(finalData);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
            setLocations(mockData);
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
