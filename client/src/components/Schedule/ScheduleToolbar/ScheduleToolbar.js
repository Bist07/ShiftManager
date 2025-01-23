import React, { useState, useEffect } from 'react';
import {
    Box, Toolbar, Button, MenuItem, Collapse, IconButton, Typography, MenuList, Popover
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatWeek, generateWeeks } from '../../../utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { FilterToolbar } from '../../Filters';
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
    const [filterOpen, setFilterOpen] = useState(false); // State for collapsible filter section
    const [currentFilters, setCurrentFilters] = useState({
        Employee: [],
        Location: [],
        Position: [],
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
            <Toolbar>
                <Box sx={{ display: 'flex', gap: '16px', height: '40px' }}>
                    <IconButton
                        onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
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
                        }}>

                        <IconButton
                            varient="contained"
                            onClick={handlePrev}
                            sx={{
                                borderTopRightRadius: '0px',
                                borderBottomRightRadius: '0px',
                            }}
                        >
                            <ArrowLeftIcon />
                        </IconButton>

                        <IconButton
                            varient="contained"
                            onClick={handleNext}
                            sx={{
                                borderTopLeftRadius: '0px',
                                borderBottomLeftRadius: '0px',
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
                                        borderRadius: '5px',
                                        bgcolor: '#15181b', '& input': {
                                            fontSize: '14px',
                                            color: 'secondary.main',
                                            '&:hover': {
                                                color: '#ebf5ff',
                                            },
                                        },
                                        svg: {
                                            color: '#3399ff',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {

                                                borderColor: '#20242a', // Change the border color
                                                borderRadius: '4px',
                                                width: '100%',
                                                height: '120%',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#303840', // Border color when hovering
                                            },

                                        },
                                        '& .MuiInputAdornment-positionEnd .MuiIconButton-root': {
                                            // Target the icon button inside the adornment
                                            '&:hover': {
                                                borderColor: 'transparent',
                                                backgroundColor: 'transparent', // Ensure no background color changes if you only want border effect
                                            },
                                        },
                                    }
                                }
                            }
                            }
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
                                color: 'primary.main',
                                padding: '8px 16px',
                            }}
                        >
                            {selectedWeek
                                ? `${formatWeek(selectedWeek[0])} - ${formatWeek(selectedWeek[selectedWeek.length - 1])}`
                                : 'Select Week'}
                            <ArrowDropDownIcon sx={{ fontSize: '20px', color: 'secondary.main' }} />
                        </Button>
                    )}


                    <Popover
                        id="week-menu"
                        anchorEl={weekAnchorEl}
                        open={openWeekMenu}
                        onClose={() => setWeekAnchorEl(null)}
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
                                    {weeks.map((week, index) => (
                                        <MenuItem key={index} onClick={() => handleSelectWeek(week)}>
                                            {`${formatWeek(week[0])} - ${formatWeek(week[week.length - 1])}`}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Box>
                        </Box>
                    </Popover>
                </Box>

                {/* Box with flexGrow to push Tune button to the right */}
                <Box sx={{ display: 'flex', flexGrow: 1 }} />
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <AutoAssignButton onClick={handleAutoAssign} />
                    {/* Tune Button, flipped when filter is open */}
                    <IconButton
                        onClick={handleToggleFilter}
                        sx={{
                            color: filterOpen ? 'primary.main' : 'secondary.main',
                        }}
                    >
                        Filters
                        <TuneIcon sx={{ transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)', }} />
                    </IconButton>
                    <IconButton
                        onClick={handleOpenDialog}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': { bgcolor: '#0077e5', borderColor: '#0077e5', },
                        }}
                    >
                        <AddIcon />
                        <Typography sx={{ marginRight: '4px', }}>Create shift</Typography>
                    </IconButton>
                </Box>
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
                <FilterToolbar onFiltersChange={handleFiltersChange} filterList={['Location', 'Position', 'Employee']} />
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
