import React, { useEffect } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { generateValidDates } from '../../../../utils/dateUtils';
import dayjs from 'dayjs';

const RepeatOptions = ({ formData, handleChange }) => {
    const [repeatOptions, setRepeatOptions] = React.useState({
        frequency: '',
        days: [],
        startDate: formData.date,
        endDate: '',
    });

    const dayMapping = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
    };

    const frequencyMapping = {
        'this-week': 1,
        'every-week': 7,
        'every-2-weeks': 14,
        'every-3-weeks': 21,
        'every-4-weeks': 28,
        'every-5-weeks': 35,
        'every-6-weeks': 42,
        'every-7-weeks': 49,
        'every-8-weeks': 56,
    };

    const reverseDayMapping = Object.fromEntries(
        Object.entries(dayMapping).map(([key, value]) => [value, key])
    );

    const reverseFrequencyMapping = Object.fromEntries(
        Object.entries(frequencyMapping).map(([key, value]) => [value, key])
    );

    useEffect(() => {
        setRepeatOptions((prev) => ({
            ...prev,
            startDate: formData.date,
        }));
    }, [formData.date]);

    const handleRepeatOptionsChange = (event, newDays) => {
        const { name, value } = event.target;

        setRepeatOptions((prev) => {
            const updatedOptions = { ...prev };

            // Handle days selection correctly
            if (name === 'days') {
                updatedOptions.days = newDays || [];
            } else if (name === 'frequency') {
                updatedOptions.frequency = frequencyMapping[value] || '';
            } else {
                updatedOptions[name] = value;
            }

            handleChange('repeat', updatedOptions);
            return updatedOptions;
        });
    };

    return (
        <Box>
            <Box mt={2}>
                <FormControl fullWidth margin="1">
                    <InputLabel>Repeat Frequency</InputLabel>
                    <Select
                        value={reverseFrequencyMapping[repeatOptions.frequency] || ''}
                        name="frequency"
                        onChange={(e) => handleRepeatOptionsChange(e, e.target.value)}
                    >
                        {Object.keys(frequencyMapping).map((key) => (
                            <MenuItem key={key} value={key}>
                                {key.replace(/-/g, ' ')}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box mt={2}>
                    <FormControl fullWidth margin="2">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    value={repeatOptions.days}
                                    onChange={(e, newDays) => handleRepeatOptionsChange(e, newDays)}
                                    name="days"
                                    aria-label="days of the week"
                                    fullWidth
                                >
                                    {Object.keys(dayMapping).map((day) => (
                                        <ToggleButton
                                            name="days"
                                            key={day}
                                            value={dayMapping[day]}
                                            aria-label={day}
                                        >
                                            {day}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>

                {repeatOptions.frequency > 1 && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={2}
                        flexWrap="wrap"
                        marginTop={2}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={repeatOptions.startDate ? dayjs(repeatOptions.startDate) : null}
                                disabled // Lock the start date
                                fullWidth
                                margin="normal"
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DatePicker
                                minDate={dayjs(repeatOptions.startDate)}
                                label="End Date"
                                value={repeatOptions.endDate ? dayjs(repeatOptions.endDate) : null}
                                onChange={(date) => handleRepeatOptionsChange({ target: { name: 'endDate', value: date ? date.format('YYYY-MM-DD') : '' } })}
                                fullWidth
                                margin="normal"
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default RepeatOptions;
