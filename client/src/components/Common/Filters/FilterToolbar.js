import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Filter } from '.';
import { useEmployee, useLocations, useRoles, usePositions } from '../../../hooks';

const FilterToolbar = ({ onFiltersChange, filterList }) => {
    const { employees = [] } = useEmployee();
    const { locations = [] } = useLocations();
    const { roles = [] } = useRoles();
    const { positions = [] } = usePositions();
    //const { statuses = [] } = useStatus();
    // { name: 'Status', data: statuses, optionIdKey: 'Status' },
    const filterData = [
        { name: 'Employee', data: employees, optionIdKey: 'e_id' },
        { name: 'Role', data: roles, optionIdKey: 'role_id' },
        { name: 'Location', data: locations, optionIdKey: 'location_id' },
        { name: 'Position', data: positions, optionIdKey: 'position_id' },
        {
            name: 'Event',
            data: [
                { name: 'Scheduled shifts' },
                { name: 'Unassigned shifts' },
                { name: 'Availability' },
            ],
            optionIdKey: 'name'
        },
    ];

    function filterNamesFromData(filterData, filterList) {
        const filteredData = filterData.filter(item => filterList?.includes(item.name));

        return filteredData.sort((a, b) => filterList.indexOf(a.name) - filterList.indexOf(b.name));
    }

    const filteredData = filterNamesFromData(filterData, filterList);

    const initialAnchorEls = filteredData.reduce((acc, data) => {
        acc[data.name] = null;
        return acc;
    }, {});

    const [anchorEls, setAnchorEls] = useState(initialAnchorEls);

    const initialFilters = filteredData.reduce((acc, data) => {
        acc[data.name] = [];
        return acc;
    }, {});

    const [filters, setFilters] = useState(initialFilters);


    const handleSelectFilter = (category, id) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };

            if (id === 'clear') {
                updatedFilters[category] = [];
            } else {
                updatedFilters[category] = updatedFilters[category].includes(id)
                    ? updatedFilters[category].filter((filterId) => filterId !== id)
                    : [...updatedFilters[category], id];
            }

            onFiltersChange?.(updatedFilters);
            return updatedFilters;
        });
    };

    return (
        <Toolbar>
            <Box sx={{ display: 'flex', gap: '16px', height: '40px' }}>
                {filteredData.map(({ name, data, optionIdKey }) => (
                    <Filter
                        key={name}
                        anchorEl={anchorEls[name]}
                        setAnchorEl={(el) => setAnchorEls((prev) => ({ ...prev, [name]: el }))}
                        filters={filters}
                        handleSelectFilter={handleSelectFilter}
                        filterOptions={data}
                        filterName={name}
                        optionIdKey={optionIdKey}
                    />
                ))}
            </Box>
        </Toolbar>
    );
};


export default FilterToolbar;
