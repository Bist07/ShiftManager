import React from 'react';
import {
    MenuItem, Checkbox, ListItemText, IconButton, Button, MenuList, Popover, Box

} from '@mui/material';
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
                    color: filters.employeeFilters.length > 0 ? 'primary.main' : 'secondary.main',
                }}
            >
                <PersonIcon />
                {renderButtonText(filters.employeeFilters, 'Employee')}
            </IconButton>
            <Popover
                id="employee-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1), 0px -3px 6px rgba(0, 0, 0, 0.1)",
                    padding: "0",
                    marginTop: "6px",
                    width: "auto",
                }}
            > <Box
                sx={{
                    display: "flex",
                    gap: 0,
                    padding: 0,
                    border: "1px solid #e0e0e0",
                    borderColor: "#101010",
                    borderRadius: "4px",
                    backgroundColor: '#15181b',
                }}
            >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0,
                            mt: 0.5,
                            mb: 0.5,
                        }}
                    >
                        <MenuList
                            sx={{
                                maxHeight: 300,
                                overflowY: "auto",
                                padding: "0",
                            }}
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
                        </MenuList>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default EmployeeFilter;
