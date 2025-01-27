import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { formatTime, getHours } from '../../../utils';


const ShiftDetails = ({ shift, date, onClick }) => {
    if (shift) {
        const shiftForDay = shift.shiftDays[date]; // This gives you the array for that date
        const startTime = shiftForDay && shiftForDay[0] ? shiftForDay[0].start_time : null;
        const endTime = shiftForDay && shiftForDay[0] ? shiftForDay[0].end_time : null;
        const position = shiftForDay && shiftForDay[0] ? shiftForDay[0].position_name : null;
        const location = shiftForDay && shiftForDay[0] ? shiftForDay[0].location_name : null;

        if (startTime && endTime) {
            const { diffHours, diffRemainingMinutes, formatted } = getHours(startTime, endTime);
            return (
                <Card
                    sx={{
                        width: '100%', // Ensure content takes full width
                        height: '100%', // Ensure content takes full height
                        borderRadius: '2px',
                        boxShadow: 'none',
                        margin: 0,
                        padding: 0,
                        boxSizing: 'border-box', // Ensures padding is included in dimensions

                        color: '#00af28'
                    }}
                >

                    <CardActionArea disableRipple disableFocusRipple sx={{ display: 'flex' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 0.5, paddingLeft: 1, width: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#00af28', fontSize: '11px', textAlign: 'left' }} >
                                    {formatTime(startTime)} - {formatTime(endTime)}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '11px', textAlign: 'left' }}>
                                    • {formatted}
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '11px', textAlign: 'left' }}>
                                {position} • {location}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            );
        }
    }
};

export default ShiftDetails;
