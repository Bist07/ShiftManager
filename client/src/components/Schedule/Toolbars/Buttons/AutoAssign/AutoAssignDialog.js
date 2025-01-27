import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField } from '@mui/material';
// Import form selector components
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ValidateShift, getHours, validateAvailability } from '../../../../../utils';
import dayjs from 'dayjs';
import { useUnassignedShifts, useAvailability, useShifts, usePreference } from '../../../../../hooks';
import { createAssignment } from '../../../../../services/api';

const AutoAssignDialog = ({ open, onClose, onSave }) => {
    const { shifts, refetchShifts } = useShifts();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        start_time: "",
        end_time: "",
        date: "",
        e_id: [],
        startDate: "",
        endDate: ""
    });
    const { preference } = usePreference([]); // Assuming this returns employee preferences
    const { unassignedShifts } = useUnassignedShifts();
    const { availability } = useAvailability();


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
            refetchShifts();
            setError('');
        }
    }, [open]);

    const handleSave = async () => {
        const { startDate, endDate, e_id } = formData;

        // Validate required fields
        if (!startDate || !endDate || e_id.length === 0) {
            setError('All fields are required.');
            return;
        }

        try {
            // Convert start and end date to Dayjs objects
            const startDayjs = dayjs(formData.startDate);
            const endDayjs = dayjs(formData.endDate);

            // Filter unassigned shifts within the date range
            const filteredShifts = unassignedShifts.filter((shift) => {
                const shiftDate = dayjs(shift.full_date); // Convert shift date to Dayjs object
                return shiftDate.isBetween(startDayjs, endDayjs, null, '[]'); // Inclusive of start and end date
            });

            const totalShifts = filteredShifts.length;
            let shiftsAssigned = 0;
            const assignedShiftsByEmployee = {}; // Tracks shifts assigned per employee on the given day
            const employeeHours = {}; // Tracks total assigned hours per employee

            // Initialize assigned shifts tracker
            e_id.forEach((employee) => {
                assignedShiftsByEmployee[employee] = 0;
                employeeHours[employee] = 0; // Initialize total hours for each employee
            });


            // Iterate over each filtered shift and assign it
            while (shiftsAssigned < totalShifts) {

                const currentShift = filteredShifts[shiftsAssigned];

                // Calculate the duration of the shift in hours (assuming start_time and end_time are in proper format)
                const { diffHours } = getHours(currentShift.start_time, currentShift.end_time);
                const shiftDuration = diffHours;

                // Find available employees who are not already scheduled for the day and meet the criteria
                const availableEmployees = e_id.filter((employeeId) => {

                    const employeePref = preference.find((pref) => pref.e_id === employeeId);

                    const isAvailable = validateAvailability(
                        [employeeId],
                        dayjs(currentShift.full_date).day(), // Get the day of the week from shift date
                        currentShift.start_time,
                        currentShift.end_time,
                        availability
                    );

                    const { ScheduleConflict, IsAlreadyScheduled } = ValidateShift(shifts, e_id, currentShift.full_date, currentShift.start_time, currentShift.end_time)

                    const isEligibleForShift = employeePref &&
                        employeePref.position_id === currentShift.position_id &&
                        employeePref.location_id === currentShift.location_id &&
                        employeeHours[employeeId] + shiftDuration <= employeePref.MaxWeeklyHours; // Check if the employee can take more hours
                    return isAvailable && !IsAlreadyScheduled && isEligibleForShift;
                });

                if (availableEmployees.length === 0) {
                    console.warn(`No available employees for shift on ${currentShift.full_date}`);
                    break;
                }

                // Filter preferences and sort employees based on the available employees
                const employeesWithPreferences = preference.filter((pref) =>
                    availableEmployees.includes(pref.e_id) && pref.MaxWeeklyHours > 0
                );

                // Sort employees only by MaxWeeklyHours (ascending)
                const sortedEmployees = employeesWithPreferences.sort((a, b) => {
                    return a.MaxWeeklyHours - b.MaxWeeklyHours; // Sort by MaxWeeklyHours (ascending)
                });

                // Assign the shift to the best available employee (first in the sorted list)
                const employeeToAssign = sortedEmployees[0];
                const employeeId = employeeToAssign.e_id;

                // Assign the shift
                console.log(`Assigning shift to employee ${employeeId}:`, currentShift);
                await createAssignment(employeeId, currentShift.shift_id)
                assignedShiftsByEmployee[employeeId]++;
                employeeHours[employeeId] += shiftDuration; // Add shift hours to the employee's total hours
                shiftsAssigned++;

                // Stop if all shifts are assigned
                if (shiftsAssigned >= totalShifts) break;
            }

            // Step 4: Handle unassigned shifts
            if (shiftsAssigned === 0) {
                console.warn(`Unassigned shifts remaining: ${totalShifts - shiftsAssigned}`);
                setError('Some shifts could not be assigned. Please review manually.');
                return;
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
                        label="Start Date"
                        value={formData.startDate ? dayjs(formData.startDate) : null}
                        onChange={(date) => handleFormChange('startDate', date ? date.format('YYYY-MM-DD') : '')}
                        fullWidth
                        margin="normal"
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        minDate={dayjs(formData.startDate)}
                        label="End Date"
                        value={formData.endDate ? dayjs(formData.endDate) : null}
                        onChange={(date) => handleFormChange('endDate', date ? date.format('YYYY-MM-DD') : '')}
                        fullWidth
                        margin="normal"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                {/* <EmployeeSelector formData={formData} handleChange={handleFormChange} /> */}
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
