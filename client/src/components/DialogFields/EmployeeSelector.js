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
            <Box sx={{ display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 4, paddingRight: 2 }}>
                <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'action.active', textAlign: 'right', width: '50%' }}>Employee</Typography>
                    <PersonOutlineRoundedIcon sx={{
                        color: 'action.active',
                        fontSize: '36px',
                        borderRadius: '50px',
                        border: '2px solid #bcbcbc',
                        borderColor: 'action.active',
                        padding: 0.5,
                    }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                    <FormControl fullWidth >
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
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: '14px', // Set font size for selected option
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    fontSize: '14px', // Set font size for items in the dropdown menu
                                }),
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 1300, // Adjust z-index to make dropdown appear on top
                                }),
                            }}
                        />
                    </FormControl>
                </Box>
            </Box>
        </div>
    );
};

export default EmployeeSelector;
