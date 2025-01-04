// /hooks/useAvailability.js
import { useState, useEffect } from 'react';
import { fetchPositions } from '../services/api/positionApi';
import { transformPositionData } from '../utils/positionUtils';

const usePosition = () => {
    const [positions, setPosition] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndTransformPositions = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPositions();
                const transformedData = transformPositionData(data);
                setPosition(transformedData);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };


        fetchAndTransformPositions();

    }, []);

    return { positions, loading, error };
};

export default usePosition;
