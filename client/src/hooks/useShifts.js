// /hooks/useShifts.js
import { useState, useEffect } from 'react';
import { fetchShifts } from '../services/api/shiftApi';

const useShifts = (month, year) => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    month = month + 1;
    const fetchAndTransformShifts = async () => {
        setLoading(true);
        setError(null);
        try {

            const data = await fetchShifts(month, year);
            setShifts(data);

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
    }, [month, year]);

    const refetchShifts = () => {
        fetchAndTransformShifts();
    };

    return { shifts, loading, error, refetchShifts };
};

export default useShifts;
