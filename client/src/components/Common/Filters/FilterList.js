import React, { useEffect, useState } from 'react';
import { ListItem, List, Collapse, ListItemText, ListItemButton, ListItemIcon, Box } from '@mui/material';
import { FilterSelector } from '.';
import { useEmployee, useLocations, useRoles, usePositions } from '../../../hooks';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FilterIcon from '@mui/icons-material/Tune';
import { useSchedule } from '../../../context/ScheduleContext';

const FilterList = ({ onFiltersChange, filterList, handleDrawerOpen, drawerState }) => {
    const { employees = [] } = useEmployee();
    const { locations = [] } = useLocations();
    const { roles = [] } = useRoles();
    const { positions = [] } = usePositions();
    const { setCurrentFilters } = useSchedule();

    const handleFiltersChange = (updatedFilters) => {
        setCurrentFilters(updatedFilters);
    };

    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        handleDrawerOpen(!open);
        setOpen(!open);

    };

    useEffect(() => {
        if (drawerState === false) {
            setOpen(false);
        }
    }, [drawerState]);

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
    const hasActiveFilters = Object.values(filters).some((filter) => filter.length > 0);

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
        <List>
            {/* Parent List Item */}
            <ListItem key={'Filters'} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    onClick={() => {
                        handleToggle()
                    }}
                    sx={[
                        {
                            minHeight: 48,
                            px: 2.5,
                        },
                        drawerState
                            ? {
                                justifyContent: 'initial',
                            }
                            : {
                                justifyContent: 'center',
                            },
                    ]}
                >
                    <ListItemIcon
                        sx={[

                            {
                                minWidth: 0,
                                justifyContent: 'center',
                            },
                            drawerState
                                ? {
                                    mr: 3,
                                }
                                : {
                                    mr: 'auto',
                                },
                            hasActiveFilters ?
                                {
                                    color: 'primary.main'
                                }
                                : {
                                    color: 'inherit'
                                }

                        ]}
                    >
                        <FilterIcon sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Filters"}
                        sx={[
                            drawerState
                                ? {
                                    opacity: 1,
                                }
                                : {
                                    opacity: 0,
                                },
                        ]}
                    />
                </ListItemButton>
            </ListItem>

            {/* Nested Child Items */}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ bgcolor: (theme) => theme.palette.background.light }}>
                    <List component="div" disablePadding>
                        {filteredData.map(({ name, data, optionIdKey }) => (
                            <ListItem>
                                <FilterSelector
                                    filters={filters}
                                    handleSelectFilter={handleSelectFilter}
                                    filterName={name}
                                    filterOptions={data}
                                    optionIdKey={optionIdKey}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Collapse>

        </List >
    );
};


export default FilterList;


