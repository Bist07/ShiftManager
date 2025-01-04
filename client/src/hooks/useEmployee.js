import { useState, useEffect } from 'react';
import { fetchEmployee } from '../services/api/employeeApi';
import { transformEmployeeData } from '../utils/employeeUtils';

const useEmployee = () => {
    const [employees, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const getEmployee = async () => {
            try {
                const data = await fetchEmployee();
                const transformedEmployeeData = transformEmployeeData(data);
                setEmployee(transformedEmployeeData);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        getEmployee();
    }, []);


    return { employees, loading, error };
};

export default useEmployee;
