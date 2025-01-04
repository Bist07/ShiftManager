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
import ShiftComponent from './ShiftComponent/ShiftComponent';
import { formatTime, formatWeek } from '../utils/dateUtils';
import { getShiftDetails } from '../utils/shiftUtils';
import { mapWeekToDays } from '../utils/dateUtils';
import useShifts from '../hooks/useShifts';

const ShiftTable = ({ shifts: initialShifts, week, month, year, filter }) => {
    const mappedWeek = mapWeekToDays(week);
    const { shifts, refetchShifts } = useShifts(month, year, week, filter);
    const [currentShift, setCurrentShift] = useState(null);

    const handleOpenDialog = (shift, day) => {
        const shiftDetails = shift?.shiftDays?.[day] || {};
        const date = shiftDetails?.date || mappedWeek[day]?.[0]?.date;
        const date_id = mappedWeek[day]?.[0]?.date_id;

        setCurrentShift({
            name: shift?.name,
            e_id: shift?.e_id,
            shift_id: shiftDetails?.shift_id,
            location_id: shiftDetails?.location_id,
            location: shiftDetails?.location,
            address: shiftDetails?.address,
            day,
            date,
            date_id,
            start_time: shiftDetails?.start_time || 'N/A',
            end_time: shiftDetails?.end_time || 'N/A',
            week,
            month,
            year
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

    const getButtonStyle = (hasShift) => ({
        backgroundColor: hasShift ? 'green' : 'transparent',
        color: hasShift ? 'white' : 'black',
    });

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="employee shift table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            {Object.keys(mappedWeek).map((day) => (
                                <TableCell key={day} align="center">
                                    <strong>{day}</strong> {formatWeek(new Date(mappedWeek[day][0]?.date).toLocaleDateString())}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shifts.map((shift) => (
                            <TableRow key={shift.e_id}>
                                <TableCell component="th" scope="row">
                                    <EmployeeCard title={shift.name} description={'Employee'} />
                                </TableCell>
                                {Object.keys(mappedWeek).map((day) => {
                                    const shiftDetails = getShiftDetails(shift, day, formatTime);
                                    const hasShift = !!shift.shiftDays[day];

                                    return (
                                        <TableCell key={day} align="center">
                                            <Button
                                                onClick={() => handleOpenDialog(shift, day)}
                                                sx={getButtonStyle(hasShift)}
                                            >
                                                {shiftDetails}
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
                    name={currentShift.name}
                    e_id={currentShift.e_id}
                    day={currentShift.day}
                    date={currentShift.date}
                    date_id={currentShift.date_id}
                    week={week}
                    month={month}
                    year={year}
                    open={handleOpenDialog}
                    onSave={handleSaveShift}
                    onDelete={handleDeleteShift}
                    onClose={handleCloseDialog}
                />
            )}
        </>
    );
};

export default ShiftTable;
