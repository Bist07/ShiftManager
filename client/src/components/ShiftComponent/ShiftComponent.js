import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Collapse, Box } from '@mui/material';
//Form Selector imports
import DatePicker from './DatePicker';
import TimePickerComponent from './TimePickerComponent';
import RepeatOptions from './RepeatOptions';
import LocationSelector from './LocationSelector';
import EmployeeSelector from './EmployeeSelector';
import RoleSelector from './RoleSelector';
//Api imports
import { createBulkShift, deleteShiftsAndAssignments } from '../../services/api/shiftBulkOperationsApi';
import { updateShift } from '../../services/api/shiftApi';
//Icons import
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
//Utils import
import { isInvalid } from '../../utils/utils';
import { validateShiftAvailability, findConflictingSlots } from '../../utils/availabilityUtils';
import { ValidateShift } from '../../utils/shiftUtils';
//Hooks import
import useAvailability from '../../hooks/useAvailability';
//Misc
import ConflictDialog from './ConflictDialog';
import dayjs from 'dayjs';


const ShiftForm = ({ shift_id, e_id, location_id, role_id, start_time, end_time, date, onSave, onClose, onDelete, open }) => {
    const [error, setError] = useState('');
    const [repeat, setRepeat] = React.useState(false);
    const { availability } = useAvailability();
    const [openConflictDialog, setOpenConflictDialog] = useState(false); // State for the conflict dialog
    const [ignoreConflict, setIgnoreConflict] = useState(false); // State for the conflict dialog
    const [conflictDetails, setConflictDetails] = useState([]); // Store conflict details
    date = new Date(date).toISOString().split('T')[0];
    const dayName = dayjs(date).format('dddd');
    const dayOfWeekIndex = dayjs(date).day();

    let emp_id;
    if (typeof e_id === "undefined") {
        emp_id = ""
    } else {
        emp_id = [e_id];
    }
    const [formData, setFormData] = useState({
        start_time: start_time || "",
        end_time: end_time || "",
        date: date || "",
        repeat: "",
        role_id: role_id || '',
        location_id: location_id || "",
        e_id: emp_id || "",
    });

    // Reset formData when the dialog is opened or date/e_id changes
    useEffect(() => {
        if (open) {

            // If editing, initialize the form with the shift data
            setFormData({
                shift_id: shift_id || '',
                start_time: start_time || '',
                end_time: end_time || '',
                date: date || '',
                repeat: "",
                location_id: location_id || "",
                role_id: role_id || '',
                e_id: emp_id || "",
            });

            setError('');
        }
    }, [open]);

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
        if (!start_time || !end_time || !e_id || !location_id || !date || !role_id) {
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

        // Check availability before proceeding
        const isAvailable = validateShiftAvailability(shiftData.e_id, dayOfWeekIndex, shiftData.repeat.days, shiftData.start_time, shiftData.end_time, availability);
        const isScheduled = ValidateShift(shiftData.e_id, shiftData.repeat, shiftData.start_time, shiftData.end_time)
        if (!isAvailable && !ignoreConflict) {
            const conflicts = findConflictingSlots(shiftData.e_id, dayOfWeekIndex, shiftData.repeat.days, shiftData.start_time, shiftData.end_time, availability);
            setConflictDetails(conflicts);
            setOpenConflictDialog(true); // Open conflict dialog
            return; // Exit without saving
        }

        try {
            if (shift_id) {
                // Editing an existing shift
                await updateShift(shift_id, shiftData.start_time, shiftData.end_time, shiftData.location_id, shiftData.role_id);
            } else {
                // Creating a new shift
                await createBulkShift(
                    shiftData.date,
                    shiftData.repeat,
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
        isInvalid(formData.e_id) ||
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
        <Dialog open={open} onClose={onClose}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
                flexWrap="wrap"
            >
                <DialogTitle
                    sx={{
                        mt: 2,
                        mb: -2,
                    }}>
                    {shift_id ? 'Edit Shift' : 'Create Shift'}
                </DialogTitle>
                {/* Toggle Repeat Options Button */}
                <IconButton
                    onClick={toggleRepeat}
                    color="primary"
                    aria-label={repeat ? "Hide Repeat Options" : "Show Repeat Options"}
                    sx={{
                        color: repeat ? 'light blue' : 'grey', // Change color based on the repeat state
                        mt: 2,
                        mr: 3.25,
                        mb: -2,
                    }}
                >
                    <EventRepeatIcon />
                </IconButton>
            </Box>
            <DialogContent>
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
                onIgnore={handleIgnoreConflict}
                onEdit={handleEditConflict}
                onClose={() => setOpenConflictDialog(false)}
            />
        </Dialog>
    );
};

export default ShiftForm;
