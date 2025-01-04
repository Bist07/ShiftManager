// /hooks/useShifts.js
import { useState, useEffect } from 'react';
import { fetchShifts } from '../services/api/shiftApi';
import { transformShifts } from '../utils/shiftUtils';

const useShifts = (month, year, week, filters) => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndTransformShifts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchShifts(month, year);
            const transformedShifts = transformShifts(data, week, filters);
            setShifts(transformedShifts);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (month && year) {
            fetchAndTransformShifts();
        }
    }, [month, year, week, filters]);

    const refetchShifts = () => {
        fetchAndTransformShifts();
    };

    return { shifts, loading, error, refetchShifts };
};

export default useShifts;
