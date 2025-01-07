import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import useEmployee from '../../../hooks/useEmployee';
import { FormControl } from '@mui/material';

const EmployeeSelector = ({ formData, handleChange }) => {
    const { employees = [], loading } = useEmployee(); // Ensure employees is always an array
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        if (formData.e_id && employees.length > 0) {
            const initialEmployees = formData.e_id.map((id) => {
                const employee = employees.find((emp) => emp.e_id === id);
                return {
                    value: id,
                    label: employee ? `${employee.name}` : id,
                };
            });
            setSelectedEmployees(initialEmployees);
        }
    }, [formData.e_id, employees]);

    const handleEmployeeChange = (selectedOptions) => {
        setSelectedEmployees(selectedOptions || []);
        const selectedIds = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        handleChange("e_id", selectedIds); // Pass array of selected IDs to parent
    };

    const employeeOptions = employees.map((employee) => ({
        value: employee.e_id,
        label: `${employee.name}`,
    }));

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <CreatableSelect
                    isMulti
                    isClearable
                    isLoading={loading}
                    options={employeeOptions}
                    value={selectedEmployees}
                    onChange={handleEmployeeChange}
                    placeholder="Select or create employees"
                />
            </FormControl>
        </div>
    );
};

export default EmployeeSelector;
