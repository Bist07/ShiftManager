import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField } from '@mui/material';
// Import form selector components
import { DatePicker } from '@mui/x-date-pickers';
import EmployeeSelector from './ShiftDialogFields/EmployeeSelector';
import { assignShiftsToEmployees } from '../../services/api/shiftBulkOperationsApi';
import usePreference from '../../hooks/usePreference';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { validateAvailability } from '../../utils/availabilityUtils';
import { ValidateShift } from '../../utils/shiftUtils';
import dayjs from 'dayjs';
import useUnassignedShifts from '../../hooks/useUnassignedShifts';
import useAvailability from '../../hooks/useAvailability';
import { getMaxDate, getMinDate } from '../../utils/shiftUtils';

const AutoAssignDialog = ({ open, onClose, onSave }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        start_time: "",
        end_time: "",
        date: "",
        e_id: [],
        startDate: "",
        endDate: ""
    });
    const { prefrences } = usePreference([]); // Assuming this returns employee preferences
    const [ScheduleConflicts, setScheduleConflicts] = useState([]);
    const { unassignedShifts } = useUnassignedShifts();
    const { availability } = useAvailability();
    const [isAssigned, setIsAssigned] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [endMinDate, setEndMinDate] = useState(getMinDate(unassignedShifts));

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
                startDate: "",
                endDate: ""
            });
            setEndMinDate(getMinDate(unassignedShifts));
            setError('');
        }
    }, [open]);

    const minDate = getMinDate(unassignedShifts);
    const maxDate = getMaxDate(unassignedShifts);

    useEffect(() => {
        setEndMinDate(formData.startDate || getMinDate(unassignedShifts));
    }, [formData.startDate, unassignedShifts]);

    const handleSave = async () => {
        const { start_time, end_time, date, e_id } = formData;

        // Validate required fields
        if (!start_time || !end_time || !date || e_id.length === 0) {
            setError('All fields are required.');
            return;
        }

        // Handle availability check and assign shifts only to available employees
        const isScheduled = ValidateShift();
        const availableEmployees = e_id.filter((employeeId) => {
            const employeeAvailability = validateAvailability([employeeId], start_time, end_time, date);
            return employeeAvailability; // Filter out employees with conflicts
        });

        if (availableEmployees.length === 0) {
            setError('No available employees for the selected shift.');
            return;
        }

        // Step 1: Distribute shifts based on preferences and availability
        try {
            // Filter preferences that match the selected role and location for each employee
            const employeesWithPreferences = prefrences.filter((pref) =>
                availableEmployees.includes(pref.e_id) && pref.MaxWeeklyHours > 0
            );

            // Sort employees based on their preference
            const sortedEmployees = employeesWithPreferences.sort((a, b) => {
                // Sort logic to ensure the most appropriate assignment
                return a.MaxWeeklyHours - b.MaxWeeklyHours; // Adjust the sorting criteria based on your requirements
            });

            // Assign shifts to employees equally
            let shiftsAssigned = 0;
            const totalShifts = unassignedShifts.length;

            sortedEmployees.forEach((employee) => {
                if (shiftsAssigned < totalShifts) {
                    // Assign shift logic here
                    assignShiftsToEmployees(employee.e_id, unassignedShifts[shiftsAssigned]);
                    shiftsAssigned++;
                }
            });

            // Update the shift assignment
            onSave();
        } catch (err) {
            setError('Failed to assign shifts. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
                <DialogTitle sx={{ mt: 2, mb: -2 }}>Auto Assign Shifts</DialogTitle>
            </Box>
            <DialogContent>
                {/* Select date, time range and employees */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        minDate={dayjs(minDate)}
                        maxDate={dayjs(maxDate)}
                        label="Start Date"
                        value={formData.startDate ? dayjs(formData.startDate) : null}
                        onChange={(date) => handleFormChange('startDate', date ? date.format('YYYY-MM-DD') : '')}
                        fullWidth
                        margin="normal"
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        minDate={dayjs(endMinDate)}
                        maxDate={dayjs(maxDate)}
                        label="End Date"
                        value={formData.endDate ? dayjs(formData.endDate) : null}
                        onChange={(date) => handleFormChange('endDate', date ? date.format('YYYY-MM-DD') : '')}
                        fullWidth
                        margin="normal"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <EmployeeSelector formData={formData} handleChange={handleFormChange} />
                {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={!formData.startDate || !formData.endDate || formData.e_id.length === 0}>
                    Assign
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AutoAssignDialog;
