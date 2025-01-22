import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import useRoles from '../../hooks/useRoles';
import { FormControl, Typography, Box } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const RoleSelector = ({ formData, handleChange }) => {
    const { roles = [], loading } = useRoles(); // Ensure employees is always an array
    const [selectedRole, setSelectedRole] = useState([]);

    useEffect(() => {
        if (formData.role_id && roles.length > 0) {
            const role = roles.find((pos) => pos.role_id === formData.role_id);
            const initialRole = {
                value: formData.role_id,
                label: role ? `${role.name}` : formData.role_id,
            };
            setSelectedRole([initialRole]); // Still use an array if `setSelectedRole` expects one
        }
    }, [formData.role_id, roles]);


    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption || null);
        const selectedId = selectedOption ? selectedOption.value : null; // Extract the value from the single object
        handleChange("role_id", selectedId); // Pass the single selected ID to parent
    };


    const roleOptions = roles.map((role) => ({
        value: role.role_id,
        label: `${role.name}`,
    }));

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 4, paddingRight: 2 }}>
                <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#738190', textAlign: 'right', width: '50%' }}>Position</Typography>
                    <AssignmentOutlinedIcon sx={{
                        color: '#9ca6b0',
                        padding: 0.5,
                        fontSize: '36px',
                        borderRadius: '50px',
                        border: '2px solid #bcbcbc',
                        borderColor: '#9ca6b0',

                    }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                    <FormControl fullWidth >
                        <CreatableSelect
                            isClearable
                            isLoading={loading}
                            options={roleOptions}
                            value={selectedRole}
                            onChange={handleRoleChange}
                            placeholder="Add position"
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

export default RoleSelector;
