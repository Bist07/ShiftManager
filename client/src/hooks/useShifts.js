// /hooks/useShifts.js
import { useState, useEffect } from 'react';
import { fetchShifts } from '../services/api';
import mockData from '../mockData/shifts.json';

const useShifts = () => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchAndTransformShifts = async () => {
        setLoading(true);
        setError(null);

        try {

            const data = await fetchShifts();
            const finalData = data || mockData;
            const formattedShifts = finalData.map(shift => ({
                ...shift,  // Keep all the other properties the same
                full_date: new Date(shift.full_date).toLocaleDateString(),
            }));
            setShifts(formattedShifts);

        } catch (err) {
            setError('Failed to load data. Please try again later.');
            const formattedShifts = mockData.map(shift => ({
                ...shift,  // Keep all the other properties the same
                full_date: new Date(shift.full_date).toLocaleDateString(),
            }));
            setShifts(formattedShifts);
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
