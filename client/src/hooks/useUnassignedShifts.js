import { fetchUnassignedShifts } from '../services/api/shiftApi';
import { useState, useEffect } from 'react';

const useUnassignedShifts = () => {
    const [unassignedShifts, setUnassignedShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndTransformUnassignedShifts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUnassignedShifts();
            setUnassignedShifts(data);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchAndTransformUnassignedShifts();
    }, []);

    // Allow manual refetch
    const refetchUnassignedShifts = () => {
        fetchAndTransformUnassignedShifts();
    };

    return { unassignedShifts, loading, error, refetchUnassignedShifts };
};

export default useUnassignedShifts;
