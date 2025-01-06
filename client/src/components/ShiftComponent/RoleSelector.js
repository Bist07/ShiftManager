import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import useRoles from '../../hooks/useRoles';
import { FormControl } from '@mui/material';

const RoleSelector = ({ formData, handleChange }) => {
    const { roles = [], loading } = useRoles(); // Ensure employees is always an array
    const [selectedRole, setSelectedRole] = useState([]);

    useEffect(() => {
        if (formData.role_id && roles.length > 0) {
            const initialRole = formData.role_id.map((id) => {
                const role = roles.find((pos) => pos.role_id === id);
                return {
                    value: id,
                    label: role ? `${role.name}` : id,
                };
            });
            setSelectedRole(initialRole);
        }
    }, [formData.role_id, roles]);

    const handleRoleChange = (selectedOptions) => {
        setSelectedRole(selectedOptions || []);
        const selectedIds = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        handleChange("role_id", selectedIds); // Pass array of selected IDs to parent
    };

    const roleOptions = roles.map((role) => ({
        value: role.role_id,
        label: `${role.name}`,
    }));

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <CreatableSelect
                    isMulti
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
