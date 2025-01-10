import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { formatTime } from '../utils/dateUtils';
import { getHours } from '../utils/dateUtils';

const UnassignedShiftCard = ({ shift, date, roles, onClick }) => {
    const startTime = shift.start_time;
    const endTime = shift.end_time;
    const role = shift.role_name;

    const { diffHours, diffRemainingMinutes, formatted } = getHours(startTime, endTime);
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
            <CardActionArea sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: 'secondary', fontSize: '14px' }}>
                        {formatTime(startTime)} - {formatTime(endTime)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );



};

export default UnassignedShiftCard;
