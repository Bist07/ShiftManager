import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import EmployeeFilter from './EmployeeFilter';
import PositionFilter from './PositionFilter';
import LocationFilter from './LocationFilter';
import useEmployee from '../../../hooks/useEmployee';
import useLocations from '../../../hooks/useLocations';
import usePosition from '../../../hooks/usePosition';

const Filters = ({ onFiltersChange }) => {
    const { employees = [] } = useEmployee();
    const { locations = [] } = useLocations();
    const { positions = [] } = usePosition();

    // States to handle dropdown menu anchors
    const [anchorElEmployees, setAnchorElEmployees] = useState(null);
    const [anchorElPositions, setAnchorElPosition] = useState(null);
    const [anchorElLocations, setAnchorElLocation] = useState(null);

    const [filters, setFilters] = useState({
        employeeFilters: [],
        locationsFilters: [],
        positionsFilters: [],
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
            console.log(updatedFilters);
            return updatedFilters;
        });
    };


    return (
        <Toolbar
            sx={{
                justifyContent: 'space-between',
                backgroundColor: '#f5f5f5', padding: '12px',
                borderBottom: '1px solid #bcbcbc',
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
                <PositionFilter
                    anchorEl={anchorElPositions}
                    setAnchorEl={setAnchorElPosition}
                    filters={filters}
                    handleSelectFilter={handleSelectFilter}
                    positions={positions}
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
