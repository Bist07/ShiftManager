import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import useEmployee from '../../hooks/useEmployee';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { FormControl, Box, Typography } from '@mui/material';

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
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Typography sx={{ ml: 2, mr: 1, my: 2, fontSize: '15px', fontWeight: 600, color: 'action.active' }}>Employee</Typography>
                <PersonOutlineRoundedIcon sx={{
                    color: 'action.active', mr: 1, my: 1,
                    fontSize: '36px',
                    stroke: "#ffffff", strokeWidth: 0.5,
                    borderRadius: '50px',
                    border: '2px solid #bcbcbc',
                    borderColor: 'action.active',

                }} />
                <FormControl fullWidth margin="normal">
                    <CreatableSelect
                        isMulti
                        isClearable
                        isLoading={loading}
                        options={employeeOptions}
                        value={selectedEmployees}
                        onChange={handleEmployeeChange}
                        placeholder="Add employee(s)"
                        menuPortalTarget={document.body} // Render dropdown outside parent container
                        styles={{
                            menuPortal: (base) => ({
                                ...base,
                                zIndex: 1300, // Adjust z-index to make dropdown appear on top
                            }),
                        }}
                    />
                </FormControl>
            </Box>
        </div>
    );
};

export default EmployeeSelector;
