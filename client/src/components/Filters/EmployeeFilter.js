import React from 'react';
import { Menu, MenuItem, Checkbox, ListItemText, IconButton, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { renderButtonText } from '../../utils/utils';

const EmployeeFilter = ({ anchorEl, setAnchorEl, filters, handleSelectFilter, employees }) => {
    const handleToggle = (employee) => {
        handleSelectFilter('employeeFilters', employee.e_id);
    };

    const handleClear = () => {
        handleSelectFilter('employeeFilters', 'clear'); // Custom logic to clear all
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls="employee-menu"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    color: filters.employeeFilters.length > 0 ? '#0085ff' : '#626262',
                    fontSize: '15px',
                    textTransform: 'none',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    gap: '8px',
                    borderRadius: '5px',
                    border: '1px solid #bcbcbc', // Add border to mimic outlined style
                    borderColor: '#bcbcbc',
                    '&:hover': {
                        borderColor: filters.employeeFilters.length > 0 ? '#1c74d4' : '#bcbcbc',
                    },
                }}
            >
                <PersonIcon />
                {renderButtonText(filters.employeeFilters, 'Employee')}
            </IconButton>
            <Menu
                id="employee-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {/* Clear button */}
                {filters.employeeFilters.length > 0 && (
                    <MenuItem onClick={handleClear} sx={{ justifyContent: 'center', color: 'error.main' }}>
                        <Button variant="text" color="error">
                            Clear
                        </Button>
                    </MenuItem>
                )}

                {employees.map((employee) => (
                    <MenuItem key={employee.e_id} onClick={() => handleToggle(employee)}>
                        <Checkbox checked={filters.employeeFilters.includes(employee.e_id)} />
                        <ListItemText primary={employee.name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default EmployeeFilter;
