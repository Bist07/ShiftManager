import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import useRoles from '../../../../hooks/useRoles';
import { FormControl } from '@mui/material';

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
            <FormControl fullWidth margin="normal">
                <CreatableSelect
                    isClearable
                    isLoading={loading}
                    options={roleOptions}
                    value={selectedRole}
                    onChange={handleRoleChange}
                    placeholder="Select or create role"
                />
            </FormControl>
        </div>
    );
};

export default RoleSelector;
