import React, { useState } from 'react';
import { TableCell, Button, Box } from '@mui/material';
import UnassignedShiftCard from './ShiftDetailsCard/UnassignedShiftCard';

const UnassignedShiftCell = ({ date, shiftsForDate, onShiftClick }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <TableCell
            key={date}
            align="center"
            sx={{
                position: 'relative',
                borderBottom: '1px solid #ccc',
                borderLeft: '1px solid #ccc',
                padding: 0,
                overflow: 'hidden', // Ensures smooth transition without layout shift
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: hovered ? 'flex-start' : 'center',
                    transform: hovered ? 'scale(0.8)' : 'scale(1)',
                    transition: 'transform 0.3s ease, justify-content 0.3s ease',
                    width: '100%',
                }}
            >
                {shiftsForDate.map((shift) => (
                    <Button
                        key={shift.shift_id}
                        sx={{ padding: 0, margin: 0.5 }}
                        onClick={() => onShiftClick(shift, date)}
                    >
                        <UnassignedShiftCard shift={shift} date={date} />
                    </Button>
                ))}
            </Box>

            {hovered && (
                <Button
                    variant="contained"
                    color="#0085ff"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        transform: 'translate(0, -50%)',
                        zIndex: 2,
                        minWidth: '30px',
                        height: '30px',
                        borderRadius: '50%',
                    }}
                    onClick={() => alert('Plus button clicked')} // Replace with desired logic
                >
                    +
                </Button>
            )}
        </TableCell>
    );
};

export default UnassignedShiftCell;
