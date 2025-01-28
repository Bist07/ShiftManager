// /hooks/usePositions.js
import { useState, useEffect } from 'react';
import { fetchPositions } from '../services/api';
import mockData from '../mockData/positions.json';
const usePositions = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndTransformPositions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPositions();
            const finalData = data || mockData;
            setPositions(finalData);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
            setPositions(mockData);
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
