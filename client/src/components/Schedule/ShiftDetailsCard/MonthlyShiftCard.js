import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { formatTime, getHours } from '../../../utils';

const MonthlyShiftCard = ({ shift, onClick }) => {

    const { diffHours, diffRemainingMinutes, formatted } = getHours(shift.start_time, shift.end_time);
    return (
        <Card
            sx={{
                width: '100%', // Ensure content takes full width
                backgroundColor: '#f19b72',
                borderRadius: '2px',
                boxShadow: 'none',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box', // Ensures padding is included in dimensions
            }}
        >
            <CardActionArea disableRipple disableFocusRipple sx={{ display: 'flex' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 0.5, paddingLeft: 1, width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#0085ff', fontSize: '11px', textAlign: 'left' }} >
                            {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff', fontSize: '11px', textAlign: 'left' }}>
                            • {formatted}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#fff', fontSize: '11px', textAlign: 'left' }}>
                        {shift.position_name} • {shift.location_name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', fontSize: '11px', textAlign: 'left' }}>
                        {shift.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MonthlyShiftCard;
