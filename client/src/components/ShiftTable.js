import React, { useState, useEffect } from 'react';
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
import { getLocalDate, mapWeekToDays, formatDate } from '../utils/dateUtils';
import useShifts from '../hooks/useShifts';
import WeeklyShiftCard from './ShiftDetailsCard/WeeklyShiftCard';
import { transformShifts, GroupUnassignedShiftsByDate } from '../utils/shiftUtils';
import useEmployee from '../hooks/useEmployee';
import useUnassignedShifts from '../hooks/useUnassignedShifts';
import UnassignedShiftCard from './ShiftDetailsCard/UnassignedShiftCard';
import ShiftDialog from './ShiftDialog/ShiftDialog';

const ShiftTable = ({ shifts: initialShifts, week, year, filter, refetchTrigger }) => {
    const { employees = [], loading } = useEmployee(); // Ensure employees is always an array
    const mappedWeek = mapWeekToDays(week); // Map week to specific dates
    const { shifts, refetchShifts } = useShifts(year, filter);
    const transformedShifts = transformShifts(shifts, filter) || [];
    const [currentShift, setCurrentShift] = useState(null);
    const [showUnassigned, setShowUnassigned] = useState(false); // Toggle for unassigned shifts
    const { unassignedShifts, refetchUnassignedShifts } = useUnassignedShifts();

    useEffect(() => {
        refetchShifts();
        refetchUnassignedShifts();
    }, [refetchTrigger]);

    const handleOpenDialog = (shift, date) => {
        const shiftDetails = shift?.shiftDays?.[date] || [];

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
        refetchUnassignedShifts();
        handleCloseDialog();
    };

    const handleDeleteShift = () => {
        refetchShifts();
        refetchUnassignedShifts();
        handleCloseDialog();
    };

    const toggleUnassignedShifts = async () => {
        setShowUnassigned((prev) => !prev);
        refetchUnassignedShifts();
    };

    // Group unassigned shifts by formatted date
    const unassignedShiftsByDate = GroupUnassignedShiftsByDate(unassignedShifts);

    return (
        <>
            <Button onClick={toggleUnassignedShifts}>
                {showUnassigned ? 'Hide Unassigned Shifts' : 'Show Unassigned Shifts'}
            </Button>
            <TableContainer component={Paper}
                sx={{
                    maxHeight: '700px', // Set a maxHeight for scrolling
                    overflow: 'auto', // Enable scrolling
                }}>
                <Table stickyHeader sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="employee shift table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '15%', padding: 0 }} align="center"></TableCell>
                            {Object.keys(mappedWeek).map((day) => {
                                const date = mappedWeek[day];
                                const localDate = getLocalDate(date);
                                const formattedDate = localDate.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                                return (
                                    <TableCell key={localDate} align="center" sx={{ width: '12%', padding: 1 }}>
                                        <strong>{day}</strong> <br />
                                        {formattedDate}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                        {showUnassigned && (
                            <TableRow >
                                <TableCell
                                    colSpan={Object.keys(mappedWeek).length + 1}
                                    sx={{ borderBottom: 2, borderBottomColor: "#0085ff", color: '#0085ff' }}
                                >
                                    <strong>Unassigned Shifts</strong>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableHead>
                    <TableBody>
                        {showUnassigned && (
                            <TableRow
                                sx={{
                                    backgroundColor: '#d7e6ee', // Tint for the entire unassigned row
                                }}
                            >  <TableCell component="th" scope="row" sx={{ padding: 0, borderBottom: '1px solid #ccc' }}>
                                </TableCell>
                                {Object.keys(mappedWeek).map((day) => {
                                    const date = mappedWeek[day];
                                    const shiftsForDate = unassignedShiftsByDate[date] || [];
                                    return (
                                        <TableCell key={date} align="center" sx={{ borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc', padding: 0 }}>
                                            {shiftsForDate.map((shift) => (
                                                <Button
                                                    key={shift.shift_id}
                                                    sx={{ padding: 0, margin: 0.5 }}
                                                    onClick={() => handleOpenDialog(shift, date)}
                                                >
                                                    <UnassignedShiftCard shift={shift} date={date} />
                                                </Button>
                                            ))}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        )}
                        {employees.map((emp) => (
                            <TableRow key={emp.e_id}>
                                <TableCell component="th" scope="row" sx={{ padding: 0 }}>
                                    <EmployeeCard title={emp.name} description="Employee" />
                                </TableCell>

                                {Object.keys(mappedWeek).map((day) => {
                                    const date = mappedWeek[day];
                                    const shiftForDay = transformedShifts.find(shift => shift.e_id === emp.e_id);
                                    return (
                                        <TableCell key={date} align="center" sx={{ padding: 0, margin: 0 }}>
                                            <Button sx={{ padding: 0, margin: 0.5 }}
                                                onClick={() => handleOpenDialog(shiftForDay, date)}
                                            >
                                                <WeeklyShiftCard shift={shiftForDay} date={date} />
                                            </Button>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer >

            {currentShift && (
                <ShiftDialog
                    shift_id={currentShift.shift_id}
                    shifts={shifts}
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
            )
            }
        </>
    );
};

export default ShiftTable;
