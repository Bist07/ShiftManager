import { useState, useEffect } from 'react';
import { fetchEmployee } from '../services/api';
import { transformEmployeeData } from '../utils';

const useEmployee = () => {
    const [employees, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getEmployee = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchEmployee();
            // If fetchEmployee returns null or undefined, fallback to mockData
            const transformedEmployeeData = transformEmployeeData(data);
            setEmployee(transformedEmployeeData);
        } catch (err) {
            console.error('Error fetching employee data:', err);
            setError('Failed to load data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployee();
    }, []);

    return { employees, loading, error };
};

export default useEmployee;
