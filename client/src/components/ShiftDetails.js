import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { formatTime } from '../utils/dateUtils';
import { getHours } from '../utils/dateUtils';

const ShiftDetails = ({ shift, date, roles, onClick }) => {

    if (date) {
        const shiftForDay = shift.shiftDays[date]; // This gives you the array for that date
        const startTime = shiftForDay && shiftForDay[0] ? shiftForDay[0].start_time : null;
        const endTime = shiftForDay && shiftForDay[0] ? shiftForDay[0].end_time : null;
        const role = shiftForDay && shiftForDay[0] ? shiftForDay[0].role_name : null;

        if (startTime && endTime) {
            const { diffHours, diffRemainingMinutes, formatted } = getHours(startTime, endTime);
            return (
                <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
                    <CardActionArea sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '14px' }}>
                                {formatTime(startTime)} - {formatTime(endTime)}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="body1" sx={{ fontSize: '12px', color: 'text.secondary' }}>
                                    {role} • {formatted}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            );
        }

        // If no valid shift times, show "Add" card with hover effect
        return (
            <Card
                sx={{
                    maxWidth: 345,
                    position: 'relative',
                    opacity: 0.1, // Start with reduced opacity
                    transition: 'opacity 0.3s ease', // Smooth transition
                    '&:hover': {
                        opacity: 1, // Full opacity on hover
                    },
                }}
            >
                <CardActionArea sx={{ display: 'flex', flexDirection: 'column' }} onClick={onClick}>
                    <CardContent sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <AddIcon sx={{ fontSize: 40, color: 'primary.main', padding: 0 }} />
                            <Typography variant="body1" sx={{ fontSize: '14px', color: 'text.primary', mt: 2, padding: 0, margin: 0 }}>
                                No shift scheduled
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

    const { diffHours, diffRemainingMinutes, formatted } = getHours(shift.start_time, shift.end_time);
    return (
        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3, display: 'flex', marginLeft: 0, marginRight: 3 }}>
            <CardActionArea >
                <CardContent >
                    <Box sx={{ textAlign: 'left', padding: -20 }} >
                        <Typography variant="body1" sx={{ fontSize: '12px', color: 'primary.main', display: "block" }}>
                            {shift.name}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '12px', color: 'text.secondary', display: "block" }}>
                            {shift.role_name}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '12px', color: 'text.secondary', display: "block" }}>
                            {formatTime(shift.start_time)} - {formatTime(shift.end_time)} • {formatted}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card >
    );
};

export default ShiftDetails;