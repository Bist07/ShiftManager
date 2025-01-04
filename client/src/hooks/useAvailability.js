// /hooks/useAvailability.js
import { useState, useEffect } from 'react';
import { fetchAvailability } from '../services/api/availabilityApi';
import { transformAvailability } from '../utils/availabilityUtils';

const useAvailability = () => {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndTransformAvailability = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchAvailability();
                const transformedAvailability = transformAvailability(data);
                setAvailability(transformedAvailability);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };


        fetchAndTransformAvailability();

    }, []);

    return { availability, loading, error };
};

export default useAvailability;
