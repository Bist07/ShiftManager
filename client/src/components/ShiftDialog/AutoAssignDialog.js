import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box } from '@mui/material';
// Import form selector components
import TimePickerComponent from './ShiftDialogFields/TimePickerComponent';
import EmployeeSelector from './ShiftDialogFields/EmployeeSelector';
import { assignShiftsToEmployees } from '../../services/api/shiftBulkOperationsApi';
import { validateAvailability, findConflictingSlots } from '../../utils/availabilityUtils';
import ConflictDialog from './ConflictDialog';
import dayjs from 'dayjs';

const AutoAssignDialog = ({ open, onClose, onSave }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        start_time: "",
        end_time: "",
        date: "",
        e_id: [],
    });
    const [openConflictDialog, setOpenConflictDialog] = useState(false);
    const [conflictDetails, setConflictDetails] = useState([]);
    const [ScheduleConflicts, setScheduleConflicts] = useState([]);
    const [ignoreConflict, setIgnoreConflict] = useState(false);

    // Handle form data changes
    const handleFormChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        if (open) {
            setFormData({
                start_time: "",
                end_time: "",
                date: "",
                e_id: [],
            });
            setError('');
        }
    }, [open]);

    const handleSave = async () => {
        const { start_time, end_time, date, e_id } = formData;

        // Validate required fields
        if (!start_time || !end_time || !date || e_id.length === 0) {
            setError('All fields are required.');
            return;
        }

        // Handle conflict checking
        const isAvailable = validateAvailability(e_id, start_time, end_time, date);
        const hasConflicts = !isAvailable;

        if (hasConflicts && !ignoreConflict) {
            const conflicts = findConflictingSlots(e_id, start_time, end_time, date);
            setScheduleConflicts(conflicts);
            setConflictDetails(conflicts);
            setOpenConflictDialog(true); // Show conflict dialog
            return; // Exit without saving
        }

        try {
            // Assign the shifts to selected employees
            await assignShiftsToEmployees(formData);
            onSave();
        } catch (err) {
            setError('Failed to assign shifts. Please try again.');
        }
    };

    const handleIgnoreConflict = async () => {
        setIgnoreConflict(true);
        setOpenConflictDialog(false);
        await handleSave();
    };

    const handleEditConflict = () => {
        setIgnoreConflict(false);
        setOpenConflictDialog(false);
    };

    const handleDelete = async () => {
        try {
            // Implement delete logic if necessary
            onClose();
        } catch (err) {
            setError('Failed to delete shifts. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
                <DialogTitle sx={{ mt: 2, mb: -2 }}>Auto Assign Shifts</DialogTitle>
            </Box>
            <DialogContent>
                {/* Select date, time range and employees */}
                <TimePickerComponent formData={formData} handleChange={handleFormChange} />
                <EmployeeSelector formData={formData} handleChange={handleFormChange} />
                {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDelete} color="error">Delete</Button>
                <Button onClick={handleSave} disabled={!formData.start_time || !formData.end_time || !formData.date || formData.e_id.length === 0}>
                    Save
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
        </Dialog>
    );
};

export default AutoAssignDialog;
