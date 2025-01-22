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
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#738190', textAlign: 'right', width: '50%' }}>Employee</Typography>
                    <PersonOutlineRoundedIcon sx={{
                        color: '#9ca6b0',
                        fontSize: '36px',
                        borderRadius: '50px',
                        border: '2px solid #bcbcbc',
                        borderColor: '#9ca6b0',
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
                                    fontSize: '14px',
                                    backgroundColor: '#15181b',
                                    color: '#98a4b3',
                                    borderColor: '#20242a',
                                    '&:hover': {
                                        borderColor: '#303840',
                                    },
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#98a4b3',
                                    '&:hover': {
                                        backgroundColor: '#303840',
                                    },
                                }),
                                multiValue: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#303840', // Background color of selected values
                                    color: '#98a4b3',
                                }),
                                multiValueLabel: (provided) => ({
                                    ...provided,
                                    color: '#98a4b3',
                                }),
                                multiValueRemove: (provided) => ({
                                    ...provided,
                                    color: '#98a4b3',
                                    ':hover': {
                                        backgroundColor: '#ff5733', // Hover background for the remove button
                                        color: '#ffffff', // Hover text color
                                    },
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#15181b',
                                    color: '#98a4b3',
                                    fontSize: '14px',

                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                        ? '#3399ff'
                                        : state.isFocused
                                            ? '#303840'
                                            : '#15181b',
                                    color: state.isSelected ? 'white' : '#98a4b3',
                                    '&:hover': {
                                        backgroundColor: '#303840',
                                    },
                                }),
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 1300,
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: '#5f7183',
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
