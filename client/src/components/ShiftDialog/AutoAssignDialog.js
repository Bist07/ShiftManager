import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField } from '@mui/material';
// Import form selector components
import { DatePicker } from '@mui/x-date-pickers';
import EmployeeSelector from './ShiftDialogFields/EmployeeSelector';
// import { assignShiftsToEmployees } from '../../services/api/shiftBulkOperationsApi';
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
        const { startDate, endDate, e_id } = formData;

        // Validate required fields
        if (!startDate || !endDate || e_id.length === 0) {
            setError('All fields are required.');
            return;
        }

        try {
            // Step 1: Check availability
            const isScheduled = ValidateShift();
            const availableEmployees = e_id.filter((employeeId) =>
                validateAvailability([employeeId], unassignedShifts.start_time, unassignedShifts.end_time, availability)
            );

            if (availableEmployees.length === 0) {
                setError('No available employees for the selected shift.');
                return;
            }

            // Step 2: Filter preferences and sort employees
            const employeesWithPreferences = prefrences.filter((pref) =>
                availableEmployees.includes(pref.e_id) && pref.MaxWeeklyHours > 0
            );

            const sortedEmployees = employeesWithPreferences.sort((a, b) => {
                // Primary sort by MaxWeeklyHours (ascending)
                if (a.MaxWeeklyHours !== b.MaxWeeklyHours) {
                    return a.MaxWeeklyHours - b.MaxWeeklyHours;
                }
                // Secondary sort by employee seniority (or other criteria)
                return a.seniority - b.seniority; // Replace 'seniority' with your actual criteria
            });

            // Step 3: Distribute shifts fairly (Round-robin and 1 shift per day per employee)
            const totalShifts = unassignedShifts.length;
            let shiftsAssigned = 0;
            const assignedShiftsByEmployee = {}; // Tracks shifts assigned per employee on the given day

            // Initialize assigned shifts tracker
            sortedEmployees.forEach((employee) => {
                assignedShiftsByEmployee[employee.e_id] = 0;
            });

            while (shiftsAssigned < totalShifts) {
                for (const employee of sortedEmployees) {
                    const employeeId = employee.e_id;

                    // Check if employee has already been assigned a shift on this day
                    if (assignedShiftsByEmployee[employeeId] === 0) {
                        // Assign shift to employee
                        console.log(employeeId, unassignedShifts[shiftsAssigned]);
                        assignedShiftsByEmployee[employeeId]++;
                        shiftsAssigned++;

                        // Stop if all shifts are assigned
                        if (shiftsAssigned >= totalShifts) break;
                    }
                }
            }

            // Step 4: Handle unassigned shifts
            if (shiftsAssigned < totalShifts) {
                console.warn(`Unassigned shifts remaining: ${totalShifts - shiftsAssigned}`);
                setError('Some shifts could not be assigned. Please review manually.');
            }

            // Finalize and update state
            onSave();
        } catch (err) {
            setError('An error occurred during shift assignment. Please try again.');
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
