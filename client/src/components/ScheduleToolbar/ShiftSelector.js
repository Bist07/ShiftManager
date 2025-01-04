import React, { useState, useEffect } from 'react';
import { Box, Menu, Toolbar, Button, MenuItem, CircularProgress, Alert, TextField, Collapse, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatWeek, generateWeeks } from '../../utils/dateUtils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { fetchDates } from '../../services/api/dateApi';
import Shifts from '../Shifts';
import Filter from './Filter/Filters';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ShiftSelector = () => {
    const [weeks, setWeeks] = useState([]);
    const [weekAnchorEl, setWeekAnchorEl] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false); // State for collapsible filter section
    const [currentFilters, setCurrentFilters] = useState({
        employeeFilters: [],
        locationsFilters: [],
        positionsFilters: [],
    });
    const [viewMode, setViewMode] = useState('week'); // State to toggle between 'week' and 'month' view

    const handleFiltersChange = (updatedFilters) => {
        setCurrentFilters(updatedFilters);
    };

    const openWeekMenu = Boolean(weekAnchorEl);

    useEffect(() => {
        const fetchAndGenerateWeeks = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchDates(selectedMonth, selectedYear);
                const newWeeks = generateWeeks(data);
                setWeeks(newWeeks);
                if (!selectedWeek) {
                    setSelectedWeek(newWeeks[0]); // Set default selected week to the first one
                }
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (selectedMonth && selectedYear) {
            fetchAndGenerateWeeks();
        }
    }, [selectedMonth, selectedYear]);

    const handleSelectWeek = (week) => {
        setSelectedWeek(week);
        setWeekAnchorEl(null);
    };

    const handleToggleFilter = () => {
        setFilterOpen(!filterOpen); // Toggle filter section
    };

    const handlePrevWeek = () => {
        const currentIndex = weeks.findIndex((week) => week === selectedWeek);
        if (currentIndex > 0) {
            setSelectedWeek(weeks[currentIndex - 1]);
        } else {
            // Handle going to the previous month if needed
            if (selectedMonth === 1) {
                setSelectedMonth(12);
                setSelectedYear((prevYear) => prevYear - 1);
            } else {
                setSelectedMonth((prevMonth) => prevMonth - 1);
            }
        }
    };

    const handleNextWeek = () => {
        const currentIndex = weeks.findIndex((week) => week === selectedWeek);
        if (currentIndex < weeks.length - 1) {
            setSelectedWeek(weeks[currentIndex + 1]);
        } else {
            // Handle going to the next month if needed
            if (selectedMonth === 12) {
                setSelectedMonth(1);
                setSelectedYear((prevYear) => prevYear + 1);
            } else {
                setSelectedMonth((prevMonth) => prevMonth + 1);
            }
        }
    };

    return (
        <Box>
            <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', padding: '12px', borderBottom: '1px solid #bcbcbc' }}>
                <Box sx={{ display: 'flex', gap: '16px', height: '40px' }}>
                    <IconButton
                        onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
                        sx={{
                            borderRadius: '5px',
                            color: '#626262',
                            border: '1px solid #bcbcbc', // Add border to mimic outlined style
                            '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                    >
                        {viewMode === 'week' ? <CalendarViewWeekIcon /> : <CalendarMonthIcon />}
                    </IconButton>
                    <Box sx={{ display: 'flex', height: '40px', borderRadius: '5px', border: '1px solid #bcbcbc' }}>
                        <Box sx={{ borderRight: '1px solid #bcbcbc' }}>
                            <IconButton
                                onClick={handlePrevWeek}
                                sx={{
                                    padding: '8px',
                                }}
                            >
                                <ArrowLeftIcon />
                            </IconButton>
                        </Box>

                        <IconButton
                            onClick={handleNextWeek}
                            sx={{
                                padding: '8px',
                            }}
                        >
                            <ArrowRightIcon />
                        </IconButton>
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            slotProps={{ textField: { size: 'small' } }}
                            label=""
                            views={['year', 'month']}
                            value={new Date(selectedYear, selectedMonth - 1)}
                            onChange={(newDate) => {
                                if (newDate) {
                                    setSelectedMonth(newDate.getMonth() + 1);
                                    setSelectedYear(newDate.getFullYear());
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    {/* Render Select Week button only when viewMode is 'week' */}
                    {viewMode === 'week' && (
                        <Button
                            aria-controls={openWeekMenu ? 'week-menu' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => setWeekAnchorEl(e.currentTarget)}
                            sx={{
                                fontSize: '17px',
                                textWeight: 'bold',
                                color: selectedWeek ? '#1c74d4' : '#626262',
                                textTransform: 'none',
                                padding: '8px 16px',
                                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {selectedWeek
                                ? `${formatWeek(selectedWeek[0].date)} - ${formatWeek(selectedWeek[selectedWeek.length - 1].date)}`
                                : 'Select Week'}
                            <ArrowDropDownIcon sx={{ fontSize: '20px', color: '#bcbcbc' }} />
                        </Button>
                    )}

                    <Menu
                        id="week-menu"
                        anchorEl={weekAnchorEl}
                        open={openWeekMenu}
                        onClose={() => setWeekAnchorEl(null)}
                    >
                        {weeks.map((week, index) => (
                            <MenuItem key={index} onClick={() => handleSelectWeek(week)}>
                                {`${formatWeek(week[0].date)} - ${formatWeek(week[week.length - 1].date)}`}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                {/* Add a Box with flexGrow to push Tune button to the right */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Tune Button, flipped when filter is open */}
                <IconButton
                    onClick={handleToggleFilter}
                    sx={{
                        borderRadius: '5px',
                        border: '1px solid #bcbcbc', // Add border to mimic outlined style
                        color: filterOpen ? '#1c74d4' : '#626262',
                        transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Flip icon when toggled
                        '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                >
                    <TuneIcon />
                </IconButton>
            </Toolbar>

            <Collapse in={filterOpen}>
                <Filter onFiltersChange={handleFiltersChange} />
            </Collapse>
            <Shifts week={selectedWeek} month={selectedMonth} year={selectedYear} filters={currentFilters} viewMode={viewMode} />
        </Box>
    );
};

export default ShiftSelector;
