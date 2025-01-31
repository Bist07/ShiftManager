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
    IconButton
} from '@mui/material';
import { ShiftCard } from '../Cards';
import { getDaysInMonth, getLocalDate, filterShifts } from '../../../utils';
import { useShifts } from '../../../hooks';
import AddIcon from '@mui/icons-material/Add';
import { ShiftDialog } from '../Dialogs';

const MonthlyShiftTable = ({ month, year, filter, refetchTrigger }) => {
    const { shifts, refetchShifts } = useShifts(year);
    const filteredShifts = filterShifts(shifts, filter);
    const [currentShift, setCurrentShift] = useState(null);
    let daysInMonth = getDaysInMonth(month, year);

    useEffect(() => {
        daysInMonth = getDaysInMonth(month, year);
    }, [month, year]);

    useEffect(() => {
        refetchShifts();
    }, [refetchTrigger, year]);

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
            const shiftsForDay = filteredShifts
                .filter((shift) => shift.full_date === date)
                .map((shift) => ({
                    ...shift,
                    e_id: shift.e_id,
                    name: shift.name,
                }));

            const hasShift = shiftsForDay.length > 0;
            const localDate = getLocalDate(date);
            const formattedDate = localDate.getDate() === 1
                ? `${localDate.getDate()} ${localDate.toLocaleString('default', { month: 'short' })}`
                : `${localDate.getDate()}`;

            currentWeek.push(
                <TableCell
                    key={date}
                    align="left"
                    sx={{
                        borderTop: 0,
                        borderBottom: '1px solid #cccc',
                        borderColor: (theme) => theme.palette.border.hover,
                        padding: '8px',
                        verticalAlign: 'top',
                        position: 'relative',
                        display: 'table-cell',
                        '&:hover .add-icon': {
                            opacity: 1,
                        },
                    }}
                >
                    <Box
                        sx={{
                            minHeight: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                paddingBottom: 0,
                                marginBottom: -3,
                                marginTop: -1,
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant='Table.header.secondary'
                                sx={{
                                    padding: 0,
                                    paddingLeft: 1,
                                    marginBottom: 0,
                                    left: '8px',
                                }}
                            >
                                {formattedDate}
                            </Typography>


                            <IconButton
                                className="add-icon"
                                sx={{
                                    marginBottom: 0,
                                    padding: 0,
                                    position: 'absolute',
                                    color: 'primary.main',
                                    right: '-4px',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                                onClick={() => handleOpenDialog(null, date)}
                            >
                                <AddIcon onClick={() => handleOpenDialog('', date)} fontSize="medium" />
                            </IconButton>
                        </Box>
                        <Box sx={{ marginTop: '20px', mr: 0, ml: 0, padding: 0, width: "90%" }}>
                            {hasShift && shiftsForDay.map((shiftDetail, idx) => (
                                <Button onClick={() => handleOpenDialog(shiftDetail, date)} sx={{ margin: 0.5, padding: 0, width: "100%" }} >
                                    <Box key={idx} sx={{ margin: 0, padding: 0, width: "100%" }}>
                                        <ShiftCard shift={shiftDetail} displayName={true} />
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
            >
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="monthly shift table">
                    <TableHead>
                        <TableRow>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <TableCell
                                    key={day}
                                    align="center"
                                    sx={{
                                        paddingTop: '20px',
                                        position: 'sticky',
                                        zIndex: 1,
                                    }}
                                >
                                    <Typography variant='Table.header.secondary'>
                                        {day}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderDays()}</TableBody>
                </Table>
            </TableContainer>


            {currentShift && (
                <ShiftDialog
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
