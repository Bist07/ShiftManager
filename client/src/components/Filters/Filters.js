import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { EmployeeFilter, RoleFilter, LocationFilter } from './';
import { useEmployee, useLocations, useRoles } from '../../hooks';


const Filters = ({ onFiltersChange }) => {
    const { employees = [] } = useEmployee();
    const { locations = [] } = useLocations();
    const { roles = [] } = useRoles();

    // States to handle dropdown menu anchors
    const [anchorElEmployees, setAnchorElEmployees] = useState(null);
    const [anchorElRoles, setAnchorElRole] = useState(null);
    const [anchorElLocations, setAnchorElLocation] = useState(null);

    const [filters, setFilters] = useState({
        employeeFilters: [],
        locationFilters: [],
        roleFilters: [],
    });

    const handleSelectFilter = (category, id) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };

            if (id === 'clear') {
                // Clear all filters for the specified category
                updatedFilters[category] = [];
            } else {
                // Toggle the selected filter
                if (updatedFilters[category].includes(id)) {
                    updatedFilters[category] = updatedFilters[category].filter((filterId) => filterId !== id);
                } else {
                    updatedFilters[category] = [...updatedFilters[category], id];
                }
            }

            if (onFiltersChange) {
                onFiltersChange(updatedFilters);
            }

            return updatedFilters;
        });
    };


    return (
        <Toolbar
            sx={{
                justifyContent: 'space-between',
                backgroundColor: '#0f1214', padding: '12px',
                borderBottom: '1px solid #1d2126',

            }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    height: '40px'
                }}>
                <EmployeeFilter
                    anchorEl={anchorElEmployees}
                    setAnchorEl={setAnchorElEmployees}
                    filters={filters}
                    handleSelectFilter={handleSelectFilter}
                    employees={employees}
                />
                <RoleFilter
                    anchorEl={anchorElRoles}
                    setAnchorEl={setAnchorElRole}
                    filters={filters}
                    handleSelectFilter={handleSelectFilter}
                    roles={roles}
                />
                <LocationFilter
                    anchorEl={anchorElLocations}
                    setAnchorEl={setAnchorElLocation}
                    filters={filters}
                    handleSelectFilter={handleSelectFilter}
                    locations={locations}
                />
            </Box>
        </Toolbar>
    );
};

export default Filters;
