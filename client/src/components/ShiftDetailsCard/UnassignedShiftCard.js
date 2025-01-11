import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { formatTime } from '../../utils/dateUtils';
import { getHours } from '../../utils/dateUtils';

const UnassignedShiftCard = ({ shift, onClick }) => {
    const { diffHours, diffRemainingMinutes, formatted } = getHours(shift.start_time, shift.end_time);
    return (
        <Card sx={{
            boxShadow: 0, width: '100%', height: '100%', borderStyle: "dashed", borderColor: "#bda67f", borderRadius: 2, backgroundColor: 'transparent', margin: 0
        }}>
            <CardActionArea sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', }}>
                <CardContent>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#bda67f', fontSize: '14px' }}>
                        {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#bda67f', fontSize: '14px' }}>
                        {formatted} • {shift.role_name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default UnassignedShiftCard;
