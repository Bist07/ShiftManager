import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { formatTime, getHours } from '../../../utils';

const UnassignedShiftCard = ({ shift, onClick }) => {
    const { diffHours, diffRemainingMinutes, formatted } = getHours(shift.start_time, shift.end_time);

    return (
        <Card sx={{
            width: '100%',
            borderRadius: '2px',
            backgroundColor: '#f19b72',
            margin: 0,
            minWidth: '150px',
            maxHeight: '60px',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'flex-start',
            padding: 0,
            '&:hover': {
                backgroundColor: '#e9b298',
            }
        }}>
            <CardActionArea disableRipple disableFocusRipple sx={{ display: 'flex' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 0.5, paddingLeft: 1, width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#fff', fontSize: '11px', textAlign: 'left' }} >
                            {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff', fontSize: '11px', textAlign: 'left' }}>
                            • {formatted}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#fff', fontSize: '11px', textAlign: 'left' }}>
                        {shift.role_name} • {shift.location_name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default UnassignedShiftCard;
