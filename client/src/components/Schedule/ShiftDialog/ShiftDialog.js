import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Collapse, Box, Tabs, Tab, Divider } from '@mui/material';
import { DatePicker, TimePickerComponent, RepeatOptions, LocationSelector, EmployeeSelector, RoleSelector } from '../../DialogFields';
import { createBulkShift, deleteShiftsAndAssignments } from '../../../services/api';
import { handleShiftChanges } from '../../../services/shiftService';
import RepeatIcon from '@mui/icons-material/Repeat';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CloseIcon from '@mui/icons-material/Close';
import { validateAvailability, findConflictingSlots, generateValidDates, ValidateShift, isInvalid } from '../../../utils';
import { useAvailability } from '../../../hooks';
import ConflictDialog from './ConflictDialog';
import dayjs from 'dayjs';

const ShiftDialog = ({ shift_id, shifts, e_id, location_id, role_id, start_time, end_time, date, onSave, onClose, onDelete, open }) => {
    const [error, setError] = useState('');
    const [repeat, setRepeat] = React.useState(false);
    const { availability } = useAvailability();
    const [openConflictDialog, setOpenConflictDialog] = useState(false); // State for the conflict dialog
    const [ignoreConflict, setIgnoreConflict] = useState(false); // State for the conflict dialog
    const [conflictDetails, setConflictDetails] = useState([]); // Store conflict details
    const [ScheduleConflicts, setScheduleConflicts] = useState([]); // Store conflict details
    const [initialData, setInitialData] = useState(null); // Store initial data
    const [tabIndex, setTabIndex] = useState(0);
    let emp_id;

    if (typeof e_id === "undefined" || e_id === null) {
        emp_id = ""
    } else {
        emp_id = [e_id];
    }
    const [formData, setFormData] = useState({
        start_time: start_time || "09:00:00",
        end_time: end_time || "17:00:00",
        date: date || "",
        repeat: "",
        role_id: role_id || '',
        location_id: location_id || "",
        e_id: emp_id || "",
        dates: [date] || "",
    });

    let dayOfWeekIndex = dayjs(formData.date).day();

    // Reset formData when the dialog is opened or date/e_id changes
    useEffect(() => {
        if (open) {
            // If editing, initialize the form with the shift data
            const data = {
                shift_id: shift_id || '',
                start_time: start_time || "09:00:00",
                end_time: end_time || "17:00:00",
                date: date || '',
                repeat: '',
                location_id: location_id || '',
                role_id: role_id || '',
                e_id: emp_id || '',
                dates: [date] || "",
            };
            setInitialData(data);
            setFormData(data);
            setError('');
        }
    }, [open]);


    useEffect(() => {
        dayOfWeekIndex = dayjs(formData.date).day();
    }, [formData.date]);

    useEffect(() => {
        if (ignoreConflict) {
            // Proceed with saving after ignoring conflicts
            handleSave();
        }
    }, [ignoreConflict]);

    const handleFormChange = (key, e) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e,
        }));
    };

    const toggleRepeat = () => {
        setRepeat((prev) => !prev);
    };

    const handleSave = async () => {
        const { start_time, end_time, date, location_id, e_id, role_id } = formData;

        // Validate required fields
        if (!start_time || !end_time || !location_id || !date || !role_id) {
            setError('All fields are required.');
            return;
        }

        const shiftData = {
            ...formData,
            start_time: start_time,
            end_time: end_time,
        };

        if (shiftData.repeat === "") {
            shiftData.repeat = {
                frequency: '1',
                days: [dayOfWeekIndex],
                startDate: shiftData.date,
                endDate: shiftData.date,
            };
        }

        if (shiftData.repeat.frequency == "1") {
            const DaysUntillEndOfWeek = 7 - (dayOfWeekIndex + 1);
            const endOfWeek = dayjs(shiftData.date).add(DaysUntillEndOfWeek, 'day').format('YYYY-MM-DD');;

            shiftData.repeat = {
                ...shiftData.repeat,
                startDate: shiftData.date,
                endDate: endOfWeek,
            };
        }

        shiftData.dates = generateValidDates(shiftData.repeat.days, shiftData.repeat.startDate, shiftData.repeat.endDate, shiftData.repeat.frequency);

        const changes = {};
        for (const key in formData) {
            if (formData[key] !== initialData[key]) {
                changes[key] = { oldValue: initialData[key], newValue: formData[key] };
            }
        }
        // Check availability before proceeding

        if (shiftData.e_id.length !== 0) {

            const { ScheduleConflict, IsAlreadyScheduled } = ValidateShift(shifts, shiftData.e_id, shiftData.dates, shiftData.start_time, shiftData.end_time)

            const isAvailable = validateAvailability(shiftData.e_id, shiftData.repeat.days, shiftData.start_time, shiftData.end_time, availability);
            const hasConflicts = !isAvailable || IsAlreadyScheduled;
            if (hasConflicts && !ignoreConflict) {
                const conflicts = findConflictingSlots(
                    shiftData.e_id,
                    dayOfWeekIndex,
                    shiftData.repeat.days,
                    shiftData.start_time,
                    shiftData.end_time,
                    availability
                );
                setScheduleConflicts(ScheduleConflict);
                setConflictDetails(conflicts);
                setOpenConflictDialog(true); // Open conflict dialog
                return; // Exit without saving
            }

        }

        try {

            if (shift_id) {
                // Editing an existing shift
                await handleShiftChanges(changes, shift_id, shiftData);

            } else {
                // Creating a new shift
                await createBulkShift(
                    shiftData.dates,
                    shiftData.e_id,
                    shiftData.role_id,
                    shiftData.location_id,
                    shiftData.start_time,
                    shiftData.end_time
                );
            }
            onSave();
        } catch (err) {
            setError('Failed to save the shift. Please try again.');
        }
    };


    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleIgnoreConflict = async () => {
        setIgnoreConflict(true);
        setOpenConflictDialog(false);

        // Proceed with save after ignoring conflicts
        await handleSave();
    };


    const handleEditConflict = () => {
        // Allow editing the shift time again
        setIgnoreConflict(false)
        setOpenConflictDialog(false);
    };
    const handleDelete = async (shift_id) => {
        try {
            await deleteShiftsAndAssignments(e_id, shift_id);

            onDelete();
            onClose();
        } catch (err) {
            setError('Failed to delete the shift. Please try again.');
        }
    };

    let isSaveDisabled =
        isInvalid(formData.start_time) ||
        isInvalid(formData.end_time) ||
        isInvalid(formData.role_id) ||
        isInvalid(formData.location_id) ||
        isInvalid(formData.date);

    // If repeat is true, apply additional checks
    if (repeat) {
        isSaveDisabled =
            isSaveDisabled ||
            isInvalid(formData.repeat.frequency);

        if (formData.repeat.frequency <= 1) {
            isSaveDisabled =
                isSaveDisabled ||
                isInvalid(formData.repeat.days);
        } else if (formData.repeat.frequency > 1) {
            isSaveDisabled =
                isSaveDisabled ||
                isInvalid(formData.repeat.days) ||
                isInvalid(formData.repeat.startDate) ||
                isInvalid(formData.repeat.endDate);
        }
    }


    return (
        <Dialog open={open} onClose={onClose} >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
                flexWrap="wrap"
                sx={{
                    mt: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        ml: 3.25
                    }}

                >
                    <EditCalendarIcon sx={{
                        color: "#0085ff",
                        fontSize: '36px',
                        stroke: "#ffffff", strokeWidth: 0.5,
                        borderRadius: '50px',
                        border: '2px solid #bcbcbc',
                        borderColor: "#0085ff",
                        padding: 0.5,

                    }} />
                    <DialogTitle
                        sx={{
                            color: "#0085ff",
                            ml: -1
                        }}>
                        {shift_id ? 'Edit Shift' : 'Create Shift'}
                    </DialogTitle>
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{
                        mr: 3.25,
                    }}
                >
                    {/* Toggle Repeat Options Button */}
                    <IconButton
                        onClick={toggleRepeat}
                        color="#0085ff"
                        aria-label={repeat ? "Hide Repeat Options" : "Show Repeat Options"}
                        sx={{
                            color: repeat ? '#0085ff' : '#c1cbd4',
                            '&:hover': { color: '#a0afbe' }
                        }}
                    >
                        <RepeatIcon />
                    </IconButton>
                    <IconButton
                        onClick={onClose}
                        aria-label={"close"}
                        sx={{
                            color: '#abb3bc',
                            '&:hover': { color: '#a0afbe' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    aria-label="tabs"

                    sx={{
                        ml: 3.25,
                        '& .MuiTab-root': {
                            fontWeight: 600,
                            color: '#a3acb5',
                        },
                        '& .Mui-selected': {
                            color: '#0085ff',

                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#0085ff',
                        },
                        '& .MuiTab-root:hover': {
                            color: '#0085ff',
                        },
                    }}
                >
                    <Tab label="CUSTOM" disableRipple />
                    <Tab label="TEMPLATES" disableRipple />
                    <Tab label="TIME OFF" disableRipple />

                </Tabs>

            </Box>
            <Box sx={{ bgcolor: '#f2f5f7' }}>
                {tabIndex === 0 && (
                    <DialogContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                        <DatePicker formData={formData} handleChange={handleFormChange} />
                        <TimePickerComponent formData={formData} handleChange={handleFormChange} />
                        <Collapse in={repeat}>
                            <RepeatOptions formData={formData} handleChange={handleFormChange} />
                        </Collapse>
                        <LocationSelector formData={formData} handleChange={handleFormChange} />
                        <RoleSelector formData={formData} handleChange={handleFormChange} />
                        <EmployeeSelector formData={formData} handleChange={handleFormChange} />
                        {error && <Typography color="error">{error}</Typography>}
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    {shift_id && (
                        <Button onClick={() => handleDelete(shift_id)} color="error">
                            Delete
                        </Button>
                    )}
                    <Button onClick={handleSave} disabled={isSaveDisabled}>
                        {shift_id ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>

                {/* Conflict Dialog */}
                <ConflictDialog
                    open={openConflictDialog}
                    conflictDetails={conflictDetails}
                    ScheduleConflicts={ScheduleConflicts}
                    onIgnore={handleIgnoreConflict}
                    onEdit={handleEditConflict}
                    onClose={() => setOpenConflictDialog(false)}
                />
            </Box >
        </Dialog >
    );
};

export default ShiftDialog;
