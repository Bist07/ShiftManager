import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import EmployeeCard from './EmployeeCard';
import ShiftComponent from './ShiftDialog/ShiftDialog';
import { getLocalDate, mapWeekToDays } from '../utils/dateUtils';
import useShifts from '../hooks/useShifts';
import ShiftDetails from './ShiftDetails';
import { transformShifts } from '../utils/shiftUtils';
import useEmployee from '../hooks/useEmployee';

const ShiftTable = ({ shifts: initialShifts, week, month, year, filter }) => {
    const { employees = [], loading } = useEmployee(); // Ensure employees is always an array
    const mappedWeek = mapWeekToDays(week); // Map week to specific dates
    const { shifts, refetchShifts } = useShifts(month, year, filter);
    const transformedShifts = transformShifts(shifts, filter) || [];
    const [currentShift, setCurrentShift] = useState(null);

    const handleOpenDialog = (shift, date) => {
        const shiftDetails = shift.shiftDays[date] || [];

        setCurrentShift({
            name: shift?.name,
            e_id: shift?.e_id,
            shift_id: shiftDetails[0]?.shift_id,
            location_id: shiftDetails[0]?.location_id,
            role_id: shiftDetails[0]?.role_id,
            date,
            start_time: shiftDetails[0]?.start_time || 'N/A',
            end_time: shiftDetails[0]?.end_time || 'N/A',
        });
    };

    const handleCloseDialog = () => {
        setCurrentShift(null);
    };

    const handleSaveShift = () => {
        refetchShifts();
        handleCloseDialog();
    };

    const handleDeleteShift = () => {
        refetchShifts();
        handleCloseDialog();
    };

    return (
        <>
            <TableContainer component={Paper}
                sx={{
                    maxHeight: '700px', // Set a maxHeight for scrolling
                    overflow: 'auto', // Enable scrolling
                }}>
                <Table stickyHeader sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="employee shift table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '17%' }} align="center"></TableCell>
                            {Object.keys(mappedWeek).map((day) => {
                                const date = mappedWeek[day];
                                const localDate = getLocalDate(date)
                                const formattedDate = localDate.toLocaleDateString('en-US', {
                                    month: 'short',  // Month as abbreviated (e.g., "Dec")
                                    day: 'numeric',  // Day of the month (e.g., "16")
                                });
                                return (
                                    <TableCell key={localDate} align="center">
                                        <strong>{day}</strong> <br />
                                        {formattedDate}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.e_id}>
                                <TableCell component="th" scope="row" sx={{ width: '18%', padding: 0 }}>
                                    <EmployeeCard title={emp.name} description="Employee" />
                                </TableCell>

                                {Object.keys(mappedWeek).map((day) => {
                                    const date = mappedWeek[day];
                                    // Find the shift for the employee on that day
                                    const shiftForDay = transformedShifts.find(shift => shift.e_id === emp.e_id);

                                    return (
                                        <TableCell key={date} align="center" sx={{ padding: 0, margin: 0 }}>
                                            <Button sx={{ padding: 0, margin: 0 }}
                                                onClick={() => handleOpenDialog(shiftForDay, date)}
                                            >
                                                <ShiftDetails shift={shiftForDay} date={date} />
                                            </Button>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {currentShift && (
                <ShiftComponent
                    shift_id={currentShift.shift_id}
                    start_time={currentShift.start_time}
                    end_time={currentShift.end_time}
                    location_id={currentShift.location_id}
                    role_id={currentShift.role_id}
                    name={currentShift.name}
                    e_id={currentShift.e_id}
                    date={currentShift.date}
                    onSave={handleSaveShift}
                    open={handleOpenDialog}
                    onDelete={handleDeleteShift}
                    onClose={handleCloseDialog}
                />
            )}
        </>
    );
};

export default ShiftTable;
