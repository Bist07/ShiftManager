import React, { useState, useEffect } from 'react';
import { Box, Menu, Toolbar, Button, MenuItem, TextField, Collapse, IconButton, Typography, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatWeek, generateWeeks } from '../../../utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Filter } from '../../Filters';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import AddIcon from '@mui/icons-material/Add';
import { ShiftDialog } from '../ShiftDialog';
import dayjs from 'dayjs';
import ShiftTable from '../ShiftTable';
import MonthlyShiftTable from '../MonthlyShiftTable';
import { AutoAssignButton } from './AutoAssign';


const ScheduleToolbar = () => {
    const [weeks, setWeeks] = useState([]);
    const [weekAnchorEl, setWeekAnchorEl] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
    const [refetchTrigger, setRefetchTrigger] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false); // State for collapsible filter section
    const [currentFilters, setCurrentFilters] = useState({
        employeeFilters: [],
        locationFilters: [],
        roleFilters: [],
    });
    const [viewMode, setViewMode] = useState('week'); // State to toggle between 'week' and 'month' view
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
        setRefetchTrigger((prev) => !prev);
        handleCloseDialog();
    };

    const handleAutoAssign = () => {

    };

    return (
        <Box>
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    backgroundColor: '#0f1214',
                    padding: '12px',
                    borderBottom: '1px solid #1d2126',
                    position: 'sticky', // Stick to the top
                    top: 0,
                    zIndex: 1000,
                }}>
                <Box sx={{ display: 'flex', gap: '16px', height: '40px' }}>
                    <IconButton
                        onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
                        sx={{
                            backgroundColor: 'transparent',
                            fontSize: '15px',
                            textTransform: 'none',
                            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                            gap: '8px',
                            borderRadius: '5px',
                            color: '#ebf5ff',
                            border: '1px solid transparent', // Add border to mimic outlined style
                            '&:hover': {
                                backgroundColor: '#1a1e22',
                                borderColor: '#1d2126',

                            },
                        }}
                    >
                        {viewMode === 'week' ? (

                            <>
                                Week <ViewWeekIcon />
                            </>
                        ) : (
                            <>
                                Month <ViewModuleRoundedIcon />
                            </>
                        )}

                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '40px',
                            borderRadius: '5px',
                            border: '1px solid transparent',
                            '&:hover': {
                                borderColor: '#1d2126',
                            },
                        }}>

                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                margin: 0,
                                width: 'auto',
                                color: '#ebf5ff',
                                backgroundColor: 'transparent',
                                borderRight: '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: '#1a1e22',
                                    borderColor: '#1d2126',

                                },
                                padding: '8px',
                            }}
                        >
                            <ArrowLeftIcon />
                        </IconButton>
                        <Divider variant="inset" orientation="vertical" flexItem sx={{ bgcolor: '#1d2126', padding: 0, margin: 0 }} />
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                width: 'auto',
                                color: '#ebf5ff',
                                backgroundColor: 'transparent',
                                borderLeft: '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: '#1a1e22',
                                    borderColor: '#1d2126',

                                },
                                padding: '8px',
                            }}
                        >
                            <ArrowRightIcon />
                        </IconButton>
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year', 'month']}
                            value={new Date(selectedYear, selectedMonth)}
                            onChange={(newDate) => {
                                if (newDate) {
                                    setSelectedMonth(newDate.getMonth());
                                    setSelectedYear(newDate.getFullYear());
                                }
                            }}
                            slotProps={{
                                textField: {
                                    size: 'small', sx: {
                                        svg: { color: '#3399ff' }, borderRadius: '4px',
                                        border: '1px solid #red',
                                        bgcolor: '#15181b', '& input': {
                                            fontSize: '14px',
                                            color: '#98a4b3',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#20242a', // Change the border color
                                                borderRadius: '4px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#303840', // Border color when hovering
                                            },
                                        },
                                        '& .MuiInputAdornment-positionEnd': {
                                            '& .MuiTypography-root': {
                                                fontSize: '14px',  // Specifically target text inside the adornment
                                                color: '#b6c0c9'
                                            }
                                        },
                                    }
                                }
                            }}
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
                                color: '#3399ff',
                                textTransform: 'none',
                                padding: '8px 16px',
                                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '5px',
                                border: '1px solid transparent',
                                gap: '8px',
                                '&:hover': {
                                    backgroundColor: '#1a1e22',
                                    borderColor: '#1d2126',

                                },
                            }}
                        >
                            {selectedWeek
                                ? `${formatWeek(selectedWeek[0])} - ${formatWeek(selectedWeek[selectedWeek.length - 1])}`
                                : 'Select Week'}
                            <ArrowDropDownIcon sx={{ fontSize: '20px', color: '#ebf5ff' }} />
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
                <AutoAssignButton onClick={handleAutoAssign} />
                {/* Tune Button, flipped when filter is open */}
                <IconButton
                    onClick={handleToggleFilter}
                    sx={{
                        fontSize: '15px',
                        textTransform: 'none',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        gap: '8px',
                        borderRadius: '5px',
                        border: '1px solid transparent', // Add border to mimic outlined style
                        marginLeft: '16px',
                        color: filterOpen ? '#3399ff' : '#ebf5ff',
                        '&:hover': { backgroundColor: '#1a1e22', borderColor: '#1d2126', },
                    }}
                >
                    Filters
                    <TuneIcon sx={{ transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)', }} />
                </IconButton>
                <IconButton
                    onClick={handleOpenDialog}
                    sx={{
                        bgcolor: '#3399ff',
                        fontSize: '15px',
                        textTransform: 'none',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        gap: '6px',
                        borderRadius: '5px',
                        marginLeft: '16px',
                        color: '#ebf5ff',
                        '&:hover': { bgcolor: '#0077e5' },
                    }}
                >
                    <AddIcon />
                    <Typography sx={{ marginRight: '4px', }}>Create shift</Typography>

                </IconButton>
                {
                    currentShift && (
                        <ShiftDialog
                            date={dayjs().format('YYYY-MM-DD')}
                            onSave={handleSaveShift}
                            open={handleOpenDialog}
                            onClose={handleCloseDialog}
                        />
                    )
                }
            </Toolbar >
            <Collapse in={filterOpen}>
                <Filter onFiltersChange={handleFiltersChange} />
            </Collapse>

            <Box>
                {(
                    viewMode === 'week' ? (
                        <ShiftTable week={selectedWeek} month={selectedMonth} year={selectedYear} filter={currentFilters} refetchTrigger={refetchTrigger} />
                    ) : viewMode === 'month' ? (
                        <MonthlyShiftTable month={selectedMonth} year={selectedYear} filter={currentFilters} refetchTrigger={refetchTrigger} />
                    ) : (
                        <Typography sx={{ p: 2 }}>Invalid view mode.</Typography>
                    )
                )}
            </Box>
        </Box >

    );
};

export default ScheduleToolbar;
