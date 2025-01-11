import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';
import useEmployee from '../../hooks/useEmployee';
import useUnassignedShifts from '../../hooks/useUnassignedShifts';
import useAvailability from '../../hooks/useAvailability';
import { ValidateShift } from '../../utils/shiftUtils';
import { validateAvailability } from '../../utils/availabilityUtils';

const AutoAssignShifts = ({ unassignedShiftsByDate }) => {
    const { unassignedShifts } = useUnassignedShifts([]);
    const { employees = [] } = useEmployee();
    const { availability } = useAvailability();

    const [isAssigned, setIsAssigned] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const handleClickOpen = (shift) => {
        setSelectedShift(shift);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleEmployeeChange = (e) => {
        setSelectedEmployee(e.target.value);
    };

    const assignShifts = async () => {
        if (!selectedEmployee || !selectedShift) {
            // Handle error if no employee or shift is selected
            return;
        }

        let isScheduled;
        const scheduleConflict = await ValidateShift(
            selectedEmployee,
            selectedShift.full_date,
            selectedShift.start_time,
            selectedShift.end_time
        );

        isScheduled = scheduleConflict ? true : false;

        const isAvailable = validateAvailability(
            selectedEmployee,
            selectedShift.full_date,
            selectedShift.start_time,
            selectedShift.end_time,
            availability
        );

        const hasConflicts = !isAvailable || !isScheduled;

        if (!hasConflicts) {
            // Assign shift logic
            setIsAssigned(true);
            setOpenDialog(false);
            // Add your shift assignment logic here (e.g., API call or state update)
        }
    };

    return (
        <div>
            {/* Button to trigger the dialog */}

            <AutoAssignButton onClick={handleClickOpen} />

            {isAssigned && <div>Shift Assigned Successfully!</div>}

            {/* Dialog for selecting employee and time */}
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Assign Shift</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Select an employee and assign the shift</Typography>
                    <FormControl fullWidth>
                        <InputLabel>Employee</InputLabel>
                        <Select
                            value={selectedEmployee}
                            onChange={handleEmployeeChange}
                            label="Employee"
                        >
                            {employees.map((employee) => (
                                <MenuItem key={employee.e_id} value={employee.e_id}>
                                    {employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Display shift details only if selectedShift is not null */}
                    {selectedShift && (
                        <Typography variant="body2">
                            {`Shift: ${selectedShift.start_time} - ${selectedShift.end_time}`}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={assignShifts} color="primary">Assign</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

// AutoAssignButton.js
const AutoAssignButton = ({ shift, onClick }) => (
    <IconButton
        onClick={() => onClick(shift)}
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
        Auto Assign
    </IconButton>
);

export default AutoAssignShifts;
