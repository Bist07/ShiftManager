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
                variant='outlined'
                sx={{
                    color: filters.roleFilters.length > 0 ? '#0085ff' : '#626262',
                    fontSize: '15px',
                    textTransform: 'none',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    gap: '8px',
                    borderRadius: '5px',
                    border: '1px solid #bcbcbc',
                    borderColor: '#bcbcbc',
                    '&:hover': {
                        borderColor: Object.keys(filters.roleFilters).length > 0 ? '#1c74d4' : '#bcbcbc',
                    },
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
