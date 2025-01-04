// /components/Shifts.js
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import ShiftTable from './ShiftTable';
import MonthlyShiftTable from './MonthlyShiftTable';
import useShifts from '../hooks/useShifts'; // Import your custom hook

const Shifts = ({ week, month, year, filters, viewMode }) => {
    const { shifts, loading, error } = useShifts(month, year, filters); // Using the custom hook

    if (loading) return <div>Loading...</div>;
    if (error) {
        return (
            <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography color="error">Error: {error}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.reload()} // Simple retry logic
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {shifts.length ? (
                viewMode === 'week' ? (
                    <ShiftTable shifts={shifts} week={week} month={month} year={year} filter={filters} />
                ) : viewMode === 'month' ? (
                    <MonthlyShiftTable shifts={shifts} month={month} year={year} filter={filters} />
                ) : (
                    <Typography sx={{ p: 2 }}>Invalid view mode.</Typography>
                )
            ) : (
                <Typography sx={{ p: 2 }}>No shifts available.</Typography>
            )}
        </Box>
    );
};

export default Shifts;
