import React, { useState, useEffect } from 'react';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { FormControl, TextField, Box } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const TimePickerComponent = ({ formData, handleChange }) => {

    const [startTime, setStartTime] = useState(
        formData.start_time ? dayjs(formData.start_time, 'HH:mm') : null
    );

    const [endTime, setEndTime] = useState(dayjs(formData.end_time, 'HH:mm') || null);

    useEffect(() => {
        setStartTime(dayjs(formData.start_time, 'HH:mm') || null);
        setEndTime(dayjs(formData.end_time, 'HH:mm') || null);
    }, []);

    const handleStartTimeChange = (value) => {
        setStartTime(value);
        handleChange('start_time', value?.format('HH:mm') || '');
    };

    const handleEndTimeChange = (value) => {
        setEndTime(value);
        handleChange('end_time', value?.format('HH:mm') || '');
    };

    return (
        <FormControl fullWidth margin="normal">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                    flexWrap="wrap"
                >

                    <DesktopTimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!(startTime && endTime && endTime.isBefore(startTime))}
                                helperText={
                                    startTime && endTime && endTime.isBefore(startTime)
                                        ? 'End Time must be after Start Time'
                                        : ''
                                }
                            />
                        )}
                    />

                    <DesktopTimePicker
                        label="End Time"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        disabled={!startTime}
                        minTime={startTime}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!(startTime && endTime && endTime.isBefore(startTime))}
                                helperText={
                                    startTime && endTime && endTime.isBefore(startTime)
                                        ? 'End Time must be after Start Time'
                                        : ''
                                }
                            />
                        )}
                    />
                </Box>
            </LocalizationProvider>
        </FormControl>
    );
};

export default TimePickerComponent;
