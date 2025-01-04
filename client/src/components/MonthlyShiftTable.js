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
import ShiftComponent from './ShiftComponent/ShiftComponent';
import { formatTime, getDaysInMonth } from '../utils/dateUtils';
import { getShiftDetails } from '../utils/shiftUtils';
import useShifts from '../hooks/useShifts';

const MonthlyShiftTable = ({ shifts: initialShifts, month, year, filter }) => {
    const { shifts, refetchShifts } = useShifts(month, year, null, filter);
    const [currentShift, setCurrentShift] = useState(null);

    const daysInMonth = getDaysInMonth(month, year); // Utility to get all days in the month
    console.log('shifts', shifts);

    const handleOpenDialog = (shift, date) => {
        const shiftDetails = shift?.shiftDays?.[date] || {};
        setCurrentShift({
            ...shift,
            date,
            ...shiftDetails,
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

    const renderDays = () => {
        const rows = [];
        let currentWeek = [];

        daysInMonth.forEach((date, index) => {
            const shift = shifts.find((s) => s.shiftDays[date]);
            const hasShift = !!shift;

            const dateObject = new Date(date);
            const dayNumber = dateObject.getDate();
            const monthShort = dateObject.toLocaleString('default', { month: 'short' });

            currentWeek.push(
                <TableCell
                    key={date}
                    align="center"
                    sx={{
                        border: '1px solid #ccc', // Add border
                        padding: '8px',
                    }}
                >
                    <Button
                        onClick={() => handleOpenDialog(shift, date)}
                        sx={getButtonStyle(hasShift)}
                    >
                        {`${dayNumber} ${monthShort}`}
                    </Button>
                </TableCell>
            );

            if ((index + 1) % 7 === 0 || index === daysInMonth.length - 1) {
                rows.push(<TableRow key={`week-${rows.length}`}>{currentWeek}</TableRow>);
                currentWeek = [];
            }
        });

        return rows;
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="monthly shift table">
                    <TableHead>
                        <TableRow>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                                <TableCell
                                    key={day}
                                    align="center"
                                    sx={{
                                        border: '1px solid #ccc', // Add border
                                        padding: '8px',
                                    }}
                                >
                                    <strong>{day}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderDays()}</TableBody>
                </Table>
            </TableContainer>

            {currentShift && (
                <ShiftComponent
                    {...currentShift}
                    onSave={handleSaveShift}
                    onDelete={handleDeleteShift}
                    onClose={handleCloseDialog}
                />
            )}
        </>
    );
};

export default MonthlyShiftTable;
