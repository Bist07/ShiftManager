// /hooks/usePositions.js
import { useState, useEffect } from 'react';
import { fetchPositions } from '../services/api';

const usePositions = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndTransformPositions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPositions();

            setPositions(data);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndTransformPositions();

    }, []);

    return { positions, loading, error };
};

export default usePositions;
