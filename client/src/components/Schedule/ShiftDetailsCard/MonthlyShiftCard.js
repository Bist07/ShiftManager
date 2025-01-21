import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { formatTime, getHours } from '../../../utils';

const MonthlyShiftCard = ({ shift, onClick }) => {

    const { diffHours, diffRemainingMinutes, formatted } = getHours(shift.start_time, shift.end_time);
    return (
        <Card sx={{ width: '100%', height: '100%', borderRadius: 2, boxShadow: 3, display: 'flex', marginLeft: 0, marginRight: 3 }}>
            <CardActionArea sx={{ width: '100%', height: '100%' }}>
                <CardContent >
                    <Box sx={{ textAlign: 'left' }} >
                        <Typography variant="body1" sx={{ fontSize: '12px', color: '#0085ff', display: "block" }}>
                            {shift.name}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '12px', color: 'text.secondary', display: "block" }}>
                            {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '12px', color: 'text.secondary', display: "block" }}>
                            {shift.role_name} • {formatted}
                        </Typography>

                    </Box>
                </CardContent>
            </CardActionArea>
        </Card >
    );
};

export default MonthlyShiftCard;
