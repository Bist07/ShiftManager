// /hooks/useAvailability.js
import { useState, useEffect } from 'react';
import { fetchAvailability } from '../services/api';
import { transformAvailability } from '../utils';
import mockData from '../mockData/availability.json';

const useAvailability = () => {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndTransformAvailability = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAvailability();
            const finalData = data || mockData;
            const transformedAvailability = transformAvailability(finalData);
            setAvailability(transformedAvailability);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
            const transformedAvailability = transformAvailability(mockData);
            setAvailability(transformedAvailability);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndTransformAvailability();

    }, []);

    return { availability, loading, error };
};

export default useAvailability;
