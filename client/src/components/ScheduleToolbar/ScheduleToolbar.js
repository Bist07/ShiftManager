import React, { useState, useEffect } from 'react';
import { Box, Menu, Toolbar, Button, MenuItem, TextField, Collapse, IconButton, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatWeek, generateWeeks } from '../../utils/dateUtils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Filter from './Filters/Filters';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';
import ShiftDialog from '../ShiftDialog/ShiftDialog';
import useShifts from '../../hooks/useShifts';
import dayjs from 'dayjs';
import ShiftTable from '../ShiftTable';
import MonthlyShiftTable from '../MonthlyShiftTable';

const ScheduleToolbar = () => {
    const [weeks, setWeeks] = useState([]);
    const [weekAnchorEl, setWeekAnchorEl] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false); // State for collapsible filter section
    const [currentFilters, setCurrentFilters] = useState({
        employeeFilters: [],
        locationFilters: [],
        roleFilters: [],
    });
    const [viewMode, setViewMode] = useState('week'); // State to toggle between 'week' and 'month' view
    const { refetchShifts } = useShifts(selectedMonth, selectedYear);
    const [currentShift, setCurrentShift] = useState(null);

    const handleFiltersChange = (updatedFilters) => {
        setCurrentFilters(updatedFilters);
    };

    const openWeekMenu = Boolean(weekAnchorEl);

    useEffect(() => {
        const generatedWeeks = generateWeeks(selectedMonth, selectedYear);
        setWeeks(generatedWeeks)
        setSelectedWeek(generatedWeeks[0])
    }, [selectedMonth, selectedYear]);


    const handleSelectWeek = (week) => {
        setSelectedWeek(week);
        setWeekAnchorEl(null);
    };

    const handleToggleFilter = () => {
        setFilterOpen(!filterOpen); // Toggle filter section
    };

    const handlePrev = () => {
        if (viewMode !== 'month') {
            const currentIndex = weeks.findIndex((week) => week === selectedWeek);
            if (currentIndex > 0) {
                setSelectedWeek(weeks[currentIndex - 1]);
            } else {
                // Handle going to the previous month if needed
                if (selectedMonth === 0) {
                    setSelectedMonth(11);
                    setSelectedWeek(weeks[0])
                    setSelectedYear((prevYear) => prevYear - 1);
                } else {
                    setSelectedWeek(weeks[0])
                    setSelectedMonth((prevMonth) => prevMonth - 1);
                }
            }
        } else {

            if (selectedMonth === 0) {
                setSelectedMonth(11)
                setSelectedYear((prevYear) => prevYear - 1);
            } else {
                setSelectedMonth((prevMonth) => prevMonth - 1);
            }
        }
    };

    const handleNext = () => {
        if (viewMode !== 'month') {
            const currentIndex = weeks.findIndex((week) => week === selectedWeek);
            if (currentIndex < weeks.length - 1) {
                setSelectedWeek(weeks[currentIndex + 1]);
            } else {
                // Handle going to the next month if needed
                if (selectedMonth === 11) {
                    setSelectedMonth(0);
                    setSelectedWeek(weeks[0])
                    setSelectedYear((prevYear) => prevYear + 1);
                } else {
                    setSelectedWeek(weeks[0])
                    setSelectedMonth((prevMonth) => prevMonth + 1);
                }
            }
        } else {
            if (selectedMonth === 11) {
                setSelectedMonth(0)
                setSelectedYear((prevYear) => prevYear + 1);
            } else {
                setSelectedMonth((prevMonth) => prevMonth + 1);
            }

        }
    };

    const handleOpenDialog = () => {
        setCurrentShift({
        });
    };

    const handleCloseDialog = () => {
        setCurrentShift(null);
    };

    const handleSaveShift = () => {
        refetchShifts();
        handleCloseDialog();
    };

    return (
        <Box>
            <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', padding: '12px', borderBottom: '1px solid #bcbcbc' }}>
                <Box sx={{ display: 'flex', gap: '16px', height: '40px' }}>
                    <IconButton
                        onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
                        sx={{
                            fontSize: '15px',
                            textTransform: 'none',
                            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                            gap: '8px',
                            borderRadius: '5px',
                            color: '#626262',
                            border: '1px solid #bcbcbc', // Add border to mimic outlined style
                            '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                    >
                        {viewMode === 'week' ? (
                            <>
                                Week <CalendarViewWeekIcon />
                            </>
                        ) : (
                            <>
                                Month <CalendarMonthIcon />
                            </>
                        )}

                    </IconButton>
                    <Box sx={{ display: 'flex', height: '40px', borderRadius: '5px', border: '1px solid #bcbcbc' }}>
                        <Box sx={{ borderRight: '1px solid #bcbcbc' }}>
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    padding: '8px',
                                }}
                            >
                                <ArrowLeftIcon />
                            </IconButton>
                        </Box>

                        <IconButton
                            onClick={handleNext}
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
                            value={new Date(selectedYear, selectedMonth)}
                            onChange={(newDate) => {
                                if (newDate) {
                                    setSelectedMonth(newDate.getMonth());
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
                                fontWeight: 600,
                                color: selectedWeek ? 'primary.main' : '#626262',
                                textTransform: 'none',
                                padding: '8px 16px',
                                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {selectedWeek
                                ? `${formatWeek(selectedWeek[0])} - ${formatWeek(selectedWeek[selectedWeek.length - 1])}`
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
                                {`${formatWeek(week[0])} - ${formatWeek(week[week.length - 1])}`}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                {/* Add a Box with flexGrow to push Tune button to the right */}
                <Box sx={{ display: 'flex', flexGrow: 1, gap: '16px' }} />
                <IconButton
                    sx={{
                        fontSize: '15px',
                        textTransform: 'none',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        gap: '8px',
                        borderRadius: '5px',
                        border: '1px solid #bcbcbc', // Add border to mimic outlined style
                        color: '#626262',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                >
                    <AutoFixHighIcon />
                    Auto
                </IconButton>
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
                        color: filterOpen ? 'primary.main' : '#626262',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                >
                    Filters
                    <TuneIcon sx={{ transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)', }} />
                </IconButton>
                <IconButton
                    onClick={handleOpenDialog}
                    sx={{
                        bgcolor: 'primary.main',
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
                    <Typography sx={{ marginRight: '4px', }}>Create shift</Typography>

                </IconButton>
                {currentShift && (
                    <ShiftDialog
                        date={dayjs().format('YYYY-MM-DD')}
                        onSave={handleSaveShift}
                        open={handleOpenDialog}
                        onClose={handleCloseDialog}
                    />
                )}
            </Toolbar>

            <Collapse in={filterOpen}>
                <Filter onFiltersChange={handleFiltersChange} />
            </Collapse>

            <Box>
                {(
                    viewMode === 'week' ? (
                        <ShiftTable week={selectedWeek} month={selectedMonth} year={selectedYear} filter={currentFilters} />
                    ) : viewMode === 'month' ? (
                        <MonthlyShiftTable month={selectedMonth} year={selectedYear} filter={currentFilters} />
                    ) : (
                        <Typography sx={{ p: 2 }}>Invalid view mode.</Typography>
                    )
                )}
            </Box>
        </Box >





    );
};

export default ScheduleToolbar;
