import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { formatTime, getHours, getShiftDetails } from '../../../utils';

const ShiftDetails = ({ shift, date, displayName, onClick }) => {

    const { startTime, endTime, position, location, name } = getShiftDetails(shift, date);
    const { diffHours, diffRemainingMinutes, formatted } = getHours(startTime, endTime);
    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: '2px',
                boxShadow: 'none',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            }}
        >

            <CardActionArea disableRipple disableFocusRipple sx={{ display: 'flex' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 0.5, paddingLeft: 1, width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: shift?.e_id ? 'green.main' : 'primary.main', fontSize: '11px', textAlign: 'left' }} >
                            {formatTime(startTime)} - {formatTime(endTime)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '11px', textAlign: 'left' }}>
                            • {formatted}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '11px', textAlign: 'left' }}>
                        {position} • {location}
                    </Typography>
                    {displayName && (
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '11px', textAlign: 'left' }}>
                            {name}
                        </Typography>)}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ShiftDetails;
