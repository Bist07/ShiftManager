// /hooks/useShifts.js
import { useState, useEffect } from 'react';
import { fetchShifts } from '../services/api';

const useShifts = () => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchAndTransformShifts = async () => {
        setLoading(true);
        setError(null);

        try {

            const data = await fetchShifts();
            const formattedShifts = data.map(shift => ({
                ...shift,
                full_date: new Date(shift.full_date).toLocaleDateString(),
            }));
            setShifts(formattedShifts);


        } catch (err) {
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }

    };


    const refetchShifts = () => {
        fetchAndTransformShifts();
    };

    return { shifts, loading, error, refetchShifts };
};

export default useShifts;
