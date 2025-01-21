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
    Box,
    Typography,
    ButtonBase

} from '@mui/material';
import EmployeeCard from '../EmployeeCard';
import { getLocalDate, mapWeekToDays, transformShifts, GroupUnassignedShiftsByDate } from '../../utils';
import { useShifts, useEmployee, useUnassignedShifts } from '../../hooks';
import WeeklyShiftCard from './ShiftDetailsCard/WeeklyShiftCard';
import UnassignedShiftCard from './ShiftDetailsCard/UnassignedShiftCard';
import ShiftDialog from './ShiftDialog/ShiftDialog';
import AddShiftCard from './ShiftDetailsCard/AddShiftCard';


const ShiftTable = ({ shifts: initialShifts, week, year, filter, refetchTrigger }) => {
    const { employees = [], loading } = useEmployee(); // Ensure employees is always an array
    const mappedWeek = mapWeekToDays(week); // Map week to specific dates
    const { shifts, refetchShifts } = useShifts(year, filter);
    const transformedShifts = transformShifts(shifts, filter) || [];
    const [currentShift, setCurrentShift] = useState(null);
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
            shift_id: shiftDetails[0]?.shift_id || shift.shift_id,
            location_id: shiftDetails[0]?.location_id || shift.location_id,
            role_id: shiftDetails[0]?.role_id || shift.role_id,
            date,
            start_time: shiftDetails[0]?.start_time || shift.start_time,
            end_time: shiftDetails[0]?.end_time || shift.end_time,
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

    // Group unassigned shifts by formatted date
    const unassignedShiftsByDate = GroupUnassignedShiftsByDate(unassignedShifts);

    return (
        <>
            <TableContainer component={Paper}
                sx={{
                    maxHeight: '800px', // Set a maxHeight for scrolling
                    overflow: 'auto', // Enable scrolling
                }}>
                <Table stickyHeader sx={{ minWidth: 650, tableLayout: 'auto' }} aria-label="employee shift table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '15%', padding: 0, minWidth: 150, }} align="center"></TableCell>
                            {Object.keys(mappedWeek).map((day) => {
                                const date = mappedWeek[day];
                                const localDate = getLocalDate(date);
                                const formattedDate = localDate.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                                return (
                                    <TableCell key={localDate} align="center" sx={{ width: '12%', padding: 1, minWidth: 150, }}>
                                        <strong>{day}</strong> <br />
                                        {formattedDate}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                        <TableRow>
                            <TableCell
                                colSpan={Object.keys(mappedWeek).length + 1}
                                sx={{ borderBottom: 2, borderBottomColor: "#0085ff" }}
                            >
                                <Typography sx={{ fontWeight: 600, color: '#0085ff' }}><strong>UNASSIGNED SHIFTS</strong></Typography>


                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* Unassigned Shifts Row */}
                        <TableRow
                            sx={{
                                backgroundColor: '#d7e6ee',
                            }}
                        >
                            <TableCell component="th" scope="row" sx={{ border: '1px solid #ccc', padding: 0, minWidth: 150, }}></TableCell>
                            {Object.keys(mappedWeek).map((day) => {
                                const date = mappedWeek[day];
                                const shiftsForDate = unassignedShiftsByDate[date] || [];
                                return (
                                    <TableCell key={date} sx={{ border: '1px solid #ccc', padding: 0, minWidth: 150, verticalAlign: "top" }}>
                                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", alignContent: "flex-start" }}>
                                            {shiftsForDate.length > 0 ? (
                                                shiftsForDate.map((shift) => (
                                                    <Button
                                                        disableRipple
                                                        disableFocusRipple
                                                        key={shift.shift_id}
                                                        sx={{
                                                            padding: 0,
                                                            margin: 0.5,
                                                            width: '100%',
                                                        }}
                                                        onClick={() => handleOpenDialog(shift, date)}
                                                    >
                                                        <UnassignedShiftCard shift={shift} date={date} />
                                                    </Button>
                                                ))
                                            ) : (
                                                <Button
                                                    disableRipple
                                                    disableFocusRipple
                                                    sx={{
                                                        padding: 0,
                                                        margin: 0.5,
                                                        width: '100%',
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                        },
                                                    }}
                                                    onClick={() => handleOpenDialog(date)}
                                                >
                                                    <AddShiftCard />
                                                </Button>

                                            )}
                                        </Box>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                        <TableRow>
                            <TableCell
                                colSpan={Object.keys(mappedWeek).length + 1}
                            >
                                <Typography sx={{ fontWeight: 600, color: '#5f7183' }}><strong>SCHEDULED SHIFTS</strong></Typography>

                            </TableCell>
                        </TableRow>
                        {/* Assigned Shifts Rows (Always displayed) */}
                        {employees.map((emp) => (
                            <TableRow key={emp.e_id}>
                                <TableCell component="th" scope="row" sx={{ padding: 0 }}>
                                    <EmployeeCard title={emp.name} description="Employee" />
                                </TableCell>
                                {Object.keys(mappedWeek).map((day) => {
                                    const date = mappedWeek[day];
                                    const shiftForDay = transformedShifts.find(shift => shift.e_id === emp.e_id) || {};
                                    return (
                                        <TableCell key={date} sx={{ border: '1px solid #ccc', padding: 0, minWidth: 150, verticalAlign: "top" }}>
                                            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", alignContent: "flex-start" }}>
                                                {Object.keys(shiftForDay).length > 0 ? (
                                                    <Button
                                                        disableRipple
                                                        disableFocusRipple
                                                        key={shiftForDay.shift_id}
                                                        sx={{
                                                            padding: 0,
                                                            margin: 0.5,
                                                            width: '100%',
                                                        }}
                                                        onClick={() => handleOpenDialog(shiftForDay, date)}
                                                    >
                                                        <WeeklyShiftCard shift={shiftForDay} date={date} />
                                                    </Button>
                                                )
                                                    : (
                                                        <Button
                                                            disableRipple
                                                            disableFocusRipple
                                                            sx={{
                                                                padding: 0,
                                                                margin: 0.5,
                                                                width: '100%',
                                                                '&:hover': {
                                                                    backgroundColor: 'transparent',
                                                                },
                                                            }}
                                                            onClick={() => handleOpenDialog(date)}
                                                        >
                                                            <AddShiftCard />
                                                        </Button>

                                                    )}
                                            </Box>
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
