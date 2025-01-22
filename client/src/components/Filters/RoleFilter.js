import React from 'react';
import { Menu, MenuItem, Checkbox, ListItemText, IconButton, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { renderButtonText } from '../../utils/utils';

const RoleFilter = ({ anchorEl, setAnchorEl, filters, handleSelectFilter, roles, clearFilters }) => {
    const handleToggle = (role) => {
        handleSelectFilter('roleFilters', role.role_id);
    };

    const handleClear = () => {
        handleSelectFilter('roleFilters', 'clear'); // Custom logic to clear all
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls="role-menu"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    color: Object.keys(filters.roleFilters).length > 0 ? 'primary.main' : 'secondary.main',
                }}
            >
                <AssignmentIcon sx={{ fontSize: '20px' }} />
                {renderButtonText(filters.roleFilters, 'Role')}
            </IconButton>
            <Menu
                id="role-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {/* Clear button */}
                {filters.roleFilters.length > 0 && (
                    <MenuItem onClick={handleClear} sx={{ justifyContent: 'center', color: 'error.main' }}>
                        <Button variant="text" color="error">
                            Clear
                        </Button>
                    </MenuItem>
                )}

                {roles.map((role) => (
                    <MenuItem key={role.role_id} onClick={() => handleToggle(role)}>
                        <Checkbox checked={filters.roleFilters.includes(role.role_id)} />
                        <ListItemText primary={role.name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default RoleFilter;
