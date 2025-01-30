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

} from '@mui/material';
import { EmployeeCard } from '../../Common';
import { filterShifts, GroupUnassignedShiftsByDate } from '../../../utils';
import { useShifts, useEmployee, useUnassignedShifts } from '../../../hooks';
import { ShiftDialog } from '../Dialogs';
import { AddShiftCard, ShiftCard } from '../Cards';
import dayjs from 'dayjs';
import { generateWeekDates } from '../../../utils';

const ShiftTable = ({ shifts: initialShifts, selectedWeek, filter, refetchTrigger }) => {

    const week = selectedWeek ? selectedWeek : generateWeekDates(dayjs(new Date()));
    const { employees = [], loading } = useEmployee(); // Ensure employees is always an array
    const { shifts, refetchShifts } = useShifts();
    const filteredShifts = filterShifts(shifts, filter) || [];
    const [currentShift, setCurrentShift] = useState(null);
    const { unassignedShifts, refetchUnassignedShifts } = useUnassignedShifts();

    useEffect(() => {
        refetchShifts();
        refetchUnassignedShifts();
    }, [refetchTrigger]);

    const handleOpenDialog = (shift, date) => {
        setCurrentShift({
            name: shift?.name,
            e_id: shift?.e_id,
            shift_id: shift?.shift_id,
            location_id: shift?.location_id,
            position_id: shift?.position_id,
            date: date,
            start_time: shift?.start_time,
            end_time: shift?.end_time,
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
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650, tableLayout: 'auto' }} aria-label="employee shift table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '15%' }} align="center"></TableCell>
                            {week.map((date) => {
                                const formattedDate = date.format('YYYY-MM-DD');
                                const dayOfWeek = date.format('ddd');
                                return (
                                    <TableCell key={formattedDate} align="center" sx={{ width: '12%', paddingTop: 1 }}>
                                        <Typography variant='Table.header.secondary'>
                                            {dayOfWeek} <br />
                                        </Typography>
                                        <Typography variant='Table.header.primary'>
                                            {date.format('D')}
                                        </Typography>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                variant='header'
                                sx={{ borderBottomColor: 'primary.main' }}
                            >
                                <Typography
                                    variant='header'
                                    sx={{ color: 'primary.main' }}>
                                    <strong>UNASSIGNED SHIFTS</strong>
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* Unassigned Shifts Row */}
                        <TableRow>
                            <TableCell component="th" scope="row" ></TableCell>
                            {week.map((date) => {
                                const formattedDate = date.format('YYYY-MM-DD');
                                const shiftsForDate = unassignedShiftsByDate[formattedDate] || [];
                                return (
                                    <TableCell key={formattedDate} >
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
                                                        onClick={() => handleOpenDialog(shift, formattedDate)}
                                                    >
                                                        <ShiftCard shift={shift} date={formattedDate} />
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
                                                    onClick={() => handleOpenDialog(null, formattedDate)}
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
                                variant='header'
                                colSpan={8}
                                sx={{ borderBottomColor: "primary.green" }}
                            >
                                <Typography
                                    variant='header'
                                    sx={{ color: "primary.green" }}>
                                    <strong>SCHEDULED SHIFTS</strong></Typography>

                            </TableCell>
                        </TableRow>
                        {/* Assigned Shifts Rows (Always displayed) */}
                        {employees.map((emp) => (
                            <TableRow key={emp.e_id}>
                                <TableCell component="th" scope="row" sx={{ padding: 2 }}>
                                    <EmployeeCard title={emp.name} description="Employee" />
                                </TableCell>
                                {week.map((date) => {
                                    const formattedDate = date.format('YYYY-MM-DD');
                                    const shiftForDay = filteredShifts.find((shift) => shift.e_id === emp.e_id && shift.full_date === formattedDate) || {};
                                    return (
                                        <TableCell key={date}>
                                            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", alignContent: "flex-start" }}>
                                                {Object.keys(shiftForDay).length > 0 ? (

                                                    < Button
                                                        disableRipple
                                                        disableFocusRipple
                                                        key={shiftForDay.shift_id}
                                                        sx={{
                                                            padding: 0,
                                                            margin: 0.5,
                                                            width: '100%',
                                                        }}
                                                        onClick={() => handleOpenDialog(shiftForDay, formattedDate)}
                                                    >
                                                        <ShiftCard shift={shiftForDay} date={formattedDate} />
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
                                                            onClick={() => handleOpenDialog(null, formattedDate)}
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
                    position_id={currentShift.position_id}
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
            <Box />
        </ >
    );
};

export default ShiftTable;
