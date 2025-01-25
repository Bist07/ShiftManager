import React from 'react';
import {
    Box,
    FormControl,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const DaysToggle = ({ formData, handleChange }) => {
    const [days, setDays] = React.useState(formData || []);

    const dayMapping = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
    };

    const handleDaysChange = (event, newDays) => {
        setDays(newDays || []);
        handleChange(event, newDays || []);
    };

    return (
        <Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    margin: 1,
                    mt: 0,
                    paddingLeft: 4,
                    paddingRight: 2,
                }}
            >
                {/* Label and Add Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', width: '25%', gap: 2 }}>
                    <Typography
                        sx={{
                            fontSize: '15px',
                            fontWeight: 600,
                            color: '#738190',
                            textAlign: 'right',
                            width: '50%',
                        }}
                    >
                        Days
                    </Typography>
                    <AddIcon
                        sx={{
                            color: 'secondary.main',
                            fontSize: '36px',
                            borderRadius: '50px',
                            border: '2px solid #bcbcbc',
                            borderColor: 'secondary.main',
                            padding: 0.5,
                        }}
                    />
                </Box>

                {/* Toggle Button Group */}
                <Box sx={{ display: 'flex', alignItems: 'center', width: '75%' }}>
                    <FormControl fullWidth>
                        <ToggleButtonGroup
                            size="small"
                            value={days} // The value is now directly the array
                            onChange={(e, newDays) => handleDaysChange(e, newDays)}
                            name="days"
                            fullWidth
                            aria-label="days of the week"
                        >
                            {Object.keys(dayMapping).map((day) => (
                                <ToggleButton
                                    name="days"
                                    key={day}
                                    value={dayMapping[day]}
                                    aria-label={day}
                                    sx={{
                                        borderColor: '#20242a',
                                        '&.Mui-selected': {
                                            backgroundColor: '#2684ff',
                                            color: '#fff',
                                        },
                                        '&.Mui-selected:hover': {
                                            bgcolor: '#0077e5',
                                            borderColor: '#0077e5',
                                        },
                                    }}
                                >
                                    {day}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default DaysToggle;
