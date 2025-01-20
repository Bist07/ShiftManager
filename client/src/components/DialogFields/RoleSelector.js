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
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Typography sx={{ ml: 2, mr: 1, my: 2, fontSize: '15px', fontWeight: 600, color: 'action.active' }}>Position</Typography>
                <AssignmentOutlinedIcon sx={{
                    color: 'action.active', mr: 1, my: 1,
                    padding: 0.2,
                    fontSize: '36px',
                    stroke: "#ffffff", strokeWidth: 0.5,
                    borderRadius: '50px',
                    border: '2px solid #bcbcbc',
                    borderColor: 'action.active',

                }} />
                <FormControl fullWidth margin="normal">
                    <CreatableSelect
                        isClearable
                        isLoading={loading}
                        options={roleOptions}
                        value={selectedRole}
                        onChange={handleRoleChange}
                        placeholder="Add position"
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

export default RoleSelector;
