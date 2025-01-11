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
} from '@mui/material';
import MonthlyShiftCard from './ShiftDetailsCard/MonthlyShiftCard';
import { getDaysInMonth, getLocalDate } from '../utils/dateUtils';
import useShifts from '../hooks/useShifts';
import AddIcon from '@mui/icons-material/Add';
import ShiftComponent from './ShiftDialog/ShiftDialog';
import { transformShifts } from '../utils/shiftUtils';

const MonthlyShiftTable = ({ month, year, filter, refetchTrigger }) => {
    const { shifts, refetchShifts } = useShifts(month, year);
    const transformedShifts = transformShifts(shifts, filter);
    const [currentShift, setCurrentShift] = useState(null);
    let daysInMonth = getDaysInMonth(month, year);

    useEffect(() => {
        daysInMonth = getDaysInMonth(month, year);
    }, [month, year]);

    useEffect(() => {
        refetchShifts();
    }, [refetchTrigger, month, year]);

    const handleOpenDialog = (shift, date) => {
        setCurrentShift({
            name: shift?.name,
            e_id: shift?.e_id,
            shift_id: shift?.shift_id,
            location_id: shift?.location_id,
            date,
            start_time: shift?.start_time || 'N/A',
            end_time: shift?.end_time || 'N/A'
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

    const renderDays = () => {
        const rows = [];
        let currentWeek = [];

        daysInMonth.forEach((date, index) => {
            const shiftsForDay = transformedShifts
                .flatMap((shift) => {
                    return (shift.shiftDays?.[date] || []).map((shiftDetail) => ({
                        ...shiftDetail,
                        e_id: shift.e_id,
                        name: shift.name,
                    }));
                });

            const hasShift = shiftsForDay.length > 0;
            const localDate = getLocalDate(date);
            const formattedDate = `${localDate.getDate()} ${localDate.toLocaleString('default', { month: 'short' })}`;

            currentWeek.push(
                <TableCell
                    key={date}
                    align="left"
                    sx={{
                        borderRight: '1px solid #ccc',
                        padding: '8px',
                        verticalAlign: 'top',
                        position: 'relative',
                        display: 'table-cell', // Keep table-cell display to ensure proper layout
                        '&:hover .add-icon': {
                            opacity: 1, // Show the icon when the cell is hovered
                        },
                    }}
                >
                    <Box
                        sx={{
                            minHeight: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            position: 'relative', // Make sure the child elements are positioned correctly
                        }}
                    >
                        <Box
                            sx={{
                                color: '#626262',
                                fontSize: '12px',
                                position: 'absolute',
                                top: '0px',
                                left: '8px',
                            }}
                        >
                            {formattedDate}
                        </Box>

                        <Box
                            className="add-icon"
                            sx={{
                                position: 'absolute',
                                color: '#626262',
                                top: '0px',
                                right: '-4px',
                                opacity: 0, // Hidden by default
                                transition: 'opacity 0.3s ease', // Smooth transition to appear
                                '&:hover': {
                                    color: "primary.main",
                                },
                            }}
                            onClick={() => handleOpenDialog(null, date)}
                        >
                            <AddIcon onClick={() => handleOpenDialog('', date)} fontSize="medium" />
                        </Box>

                        <Box sx={{ marginTop: '20px', mr: 0, ml: 0, padding: 0 }}>
                            {hasShift && shiftsForDay.map((shiftDetail, idx) => (
                                <Button onClick={() => handleOpenDialog(shiftDetail, date)} sx={{ margin: 0 }} >
                                    <Box key={idx}>
                                        <MonthlyShiftCard shift={shiftDetail} />
                                    </Box>
                                </Button>
                            ))}
                        </Box>
                    </Box>
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
            <TableContainer

                component={Paper}
                sx={{
                    maxHeight: '700px', // Set a maxHeight for scrolling
                    overflow: 'auto', // Enable scrolling
                }}
            >
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="monthly shift table">
                    <TableHead>
                        <TableRow>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                                <TableCell
                                    key={day}
                                    align="center"
                                    sx={{
                                        paddingBottom: '36px',
                                        paddingTop: '20px',
                                        position: 'sticky', // Make it sticky
                                        zIndex: 1, // Ensure it's on top of other content
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
                    shift_id={currentShift.shift_id}
                    start_time={currentShift.start_time}
                    end_time={currentShift.end_time}
                    location_id={currentShift.location_id}
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

export default MonthlyShiftTable;
