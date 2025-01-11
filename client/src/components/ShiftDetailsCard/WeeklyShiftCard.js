import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { formatTime } from '../../utils/dateUtils';
import { getHours } from '../../utils/dateUtils';

const ShiftDetails = ({ shift, date, onClick }) => {
    if (shift) {
        const shiftForDay = shift.shiftDays[date]; // This gives you the array for that date
        const startTime = shiftForDay && shiftForDay[0] ? shiftForDay[0].start_time : null;
        const endTime = shiftForDay && shiftForDay[0] ? shiftForDay[0].end_time : null;
        const role = shiftForDay && shiftForDay[0] ? shiftForDay[0].role_name : null;

        if (startTime && endTime) {
            const { diffHours, diffRemainingMinutes, formatted } = getHours(startTime, endTime);
            return (
                <Card
                    sx={{
                        width: '100%', // Ensure content takes full width
                        height: '100%', // Ensure content takes full height
                        borderRadius: 2,
                        boxShadow: 3,
                        margin: 0,
                        padding: 0,
                        boxSizing: 'border-box', // Ensures padding is included in dimensions
                    }}
                >
                    <CardActionArea
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%', // Ensure content takes full width
                            height: '100%', // Ensure content takes full height
                        }}
                    >
                        <CardContent sx={{ padding: 2 }}>
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
    }

    // If no valid shift times, show "Add" card with hover effect
    return (
        <Card
            sx={{
                width: '100%', // Ensure content takes full width
                height: '100%', // Ensure content takes full height
                borderRadius: 2,
                boxShadow: 3,
                position: 'relative',
                opacity: 0.1, // Start with reduced opacity
                transition: 'opacity 0.3s ease', // Smooth transition
                '&:hover': {
                    opacity: 1, // Full opacity on hover
                },
                boxSizing: 'border-box', // Ensures padding is included in dimensions
            }}
        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
                onClick={onClick}
            >
                <CardContent sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0, paddingBottom: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <AddIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="body1" sx={{ fontSize: '14px', color: 'text.secondary', mb: 1 }}>
                            No shift scheduled
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ShiftDetails;
