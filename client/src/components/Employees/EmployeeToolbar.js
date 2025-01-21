import React, { useState, useEffect } from 'react';
import { Box, Menu, Toolbar, Button, TextField, Collapse, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Filter } from '../Filters';
import AddIcon from '@mui/icons-material/Add';
import EmployeeTable from './EmployeeTable';
// import EmployeeDialog from './EmployeeDialog';

const EmployeeToolbar = () => {

    const [refetchTrigger, setRefetchTrigger] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false); // State for collapsible filter section
    const [currentFilters, setCurrentFilters] = useState({
        employeeFilters: [],
        locationFilters: [],
        roleFilters: [],
    });
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [currentEmployee, setCurrentEmployee] = useState(null);

    const handleFiltersChange = (updatedFilters) => {
        setCurrentFilters(updatedFilters);
    };

    const handleToggleFilter = () => {
        setFilterOpen(!filterOpen); // Toggle filter section
    };

    const handleOpenDialog = () => {
        setCurrentEmployee({
        });
    };

    const handleCloseDialog = () => {
        setCurrentEmployee(null);
    };

    const handleSaveEmployee = () => {
        setRefetchTrigger((prev) => !prev);
        handleCloseDialog();
    };

    const handleSearchClick = () => {
        setIsOpen(!isOpen); // Toggle the input field visibility
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Box>
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    backgroundColor: '#f5f5f5',
                    padding: '12px',
                    borderBottom: '1px solid #bcbcbc',
                    position: 'sticky', // Stick to the top
                    top: 0,
                    zIndex: 1000,
                }}>
                <Box sx={{ display: 'flex', gap: '16px', height: '40px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#0085ff' }}>Employees</Typography>
                </Box>

                {/* Add a Box with flexGrow to push Tune button to the right */}
                <Box sx={{ display: 'flex', flexGrow: 1, gap: '16px' }} />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #bcbcbc',
                        borderRadius: '5px',
                        padding: 'px',
                        transition: 'width 0.3s ease',
                        width: isOpen ? '200px' : '40px', // Expands left
                        marginLeft: 'auto', // Push to the far right
                        backgroundColor: '#f5f5f5', // Match button background
                        '&:hover': { backgroundColor: '#f0f0f0' }, // Match hover style
                        borderColor: isOpen ? '#0085ff' : '#bcbcbc',
                        overflow: 'hidden',
                    }}
                >
                    {isOpen && (
                        <TextField
                            size="small"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder="Search"
                            fullWidth
                            sx={{
                                border: 'none',
                                outline: 'none',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                },
                            }}
                        />
                    )}
                    <IconButton
                        color="#0085ff"
                        onClick={handleSearchClick}
                        sx={{
                            padding: '8px',
                            borderRadius: '5px',
                            color: isOpen ? '#0085ff' : '#626262',
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
                {/* Tune Button, flipped when filter is open */}
                <IconButton
                    onClick={handleToggleFilter}
                    sx={{
                        fontSize: '15px',
                        textTransform: 'none',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        gap: '8px',
                        borderRadius: '5px',
                        border: '1px solid #bcbcbc', // Add border to mimic outlined style
                        marginLeft: '16px',
                        color: filterOpen ? '#0085ff' : '#626262',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                >
                    Filters
                    <TuneIcon sx={{ transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)', }} />
                </IconButton>
                <IconButton
                    onClick={handleOpenDialog}
                    sx={{
                        bgcolor: '#0085ff',
                        fontSize: '15px',
                        textTransform: 'none',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        gap: '6px',
                        borderRadius: '5px',
                        marginLeft: '16px',
                        color: '#fff',
                        '&:hover': { bgcolor: '#0077e5' },
                    }}
                >
                    <AddIcon />
                    <Typography sx={{ marginRight: '4px', }}>Add Employee</Typography>

                </IconButton>
                {/* {currentEmployee && (
                    <EmployeeDialog

                        onSave={handleSaveEmployee}
                        open={handleOpenDialog}
                        onClose={handleCloseDialog}
                    />
                )} */}
            </Toolbar>
            <Collapse in={filterOpen}>
                <Filter onFiltersChange={handleFiltersChange} />
            </Collapse>

            <Box>
                {(
                    <EmployeeTable filter={currentFilters} refetchTrigger={refetchTrigger} />

                )}
            </Box>
        </Box >

    );
};

export default EmployeeToolbar;
