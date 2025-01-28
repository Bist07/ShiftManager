import { fetchUnassignedShifts } from '../services/api';
import { useState, useEffect } from 'react';
import mockData from '../mockData/unassigned.json';

const useUnassignedShifts = () => {
    const [unassignedShifts, setUnassignedShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndTransformUnassignedShifts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUnassignedShifts();
            const finalData = data || mockData;
            const formattedShifts = finalData.map(shift => ({
                ...shift,
                full_date: new Date(shift.full_date).toLocaleDateString(),
            }));

            setUnassignedShifts(formattedShifts);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
            setUnassignedShifts(mockData);
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
