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
import ShiftDetails from './ShiftDetails';
import { getDaysInMonth } from '../utils/dateUtils';
import useShifts from '../hooks/useShifts';

const MonthlyShiftTable = ({ shifts: initialShifts, month, year, filter }) => {
    const { shifts, refetchShifts } = useShifts(month, year, filter);
    const [currentShift, setCurrentShift] = useState(null);

    const daysInMonth = getDaysInMonth(month, year); // Utility to get all days in the month

    const handleOpenDialog = (shift, date) => {
        console.log('Handling open dialog for date:', date);
        if (!date || !shift?.shiftDays) {
            console.error('Error: Date or shiftDays is undefined');
            return;
        }

        const shiftDetails = shift.shiftDays[date] || [];
        if (shiftDetails.length > 0) {
            setCurrentShift({
                ...shift,
                date,
                shiftDetails,
            });
        } else {
            console.warn(`No shifts found for date: ${date}`);
        }
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
            if (!date) {
                console.error('Invalid date:', date); // Log invalid dates
                return;
            }

            // Check if shift.shiftDays exists and has data for the date
            const shiftsForDay = shifts
                .filter((s) => s.shiftDays && s.shiftDays[date]) // Ensure shiftDays exists
                .map((s) => s.shiftDays[date]);

            if (shiftsForDay.length === 0) {
                console.warn(`No shifts available for ${date}`);
            }

            const hasShift = shiftsForDay.length > 0;

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
                        onClick={() => {
                            console.log('Clicked on date:', date); // Log when date is clicked
                            handleOpenDialog(shiftsForDay[0]?.[0], date);
                        }}
                        sx={getButtonStyle(hasShift)}
                    >
                        {`${dayNumber} ${monthShort}`}
                    </Button>
                    {hasShift && (
                        <div>
                            {shiftsForDay.flat().map((shiftDetail) => (
                                <ShiftDetails
                                    key={shiftDetail.shift_id} // Use shift_id as the key
                                    shift={shiftDetail}
                                    onSave={handleSaveShift}
                                    onDelete={handleDeleteShift}
                                    onClose={handleCloseDialog}
                                />
                            ))}
                        </div>
                    )}
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
                <ShiftDetails
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
