import { useState, useEffect } from 'react';
import { fetchEmployee } from '../services/api';
import { transformEmployeeData } from '../utils';
import mockData from '../mockData/employees.json';

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
            const finalData = data || mockData;
            const transformedEmployeeData = transformEmployeeData(finalData);
            setEmployee(transformedEmployeeData);
        } catch (err) {
            console.error('Error fetching employee data:', err);
            setError('Failed to load data. Showing mock data instead.');
            // Use mockData as fallback when fetchEmployee fails
            const transformedMockData = transformEmployeeData(mockData);
            setEmployee(transformedMockData);
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
