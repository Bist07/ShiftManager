import React, { useState, useEffect } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, FormControl, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const DatePickerComponent = ({ formData, handleChange }) => {
    const [selectedDate, setSelectedDate] = useState(formData.date ? dayjs(formData.date) : null);

    useEffect(() => {
        setSelectedDate(formData.date ? dayjs(formData.date) : null); // Update selected date when formData changes
    }, [formData.date]);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        handleChange("date", newValue ? newValue.format('YYYY-MM-DD') : ''); // Format date for the parent handler
    };

    return (

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography sx={{ ml: 2, mr: 1, my: 2, fontSize: '15px', fontWeight: 600, color: 'action.active' }}>Date</Typography>
            <CalendarMonthIcon sx={{
                color: 'action.active', mr: 1, my: 1.5,
                fontSize: '36px',
                stroke: "#ffffff", strokeWidth: 0.5,
                borderRadius: '50px',
                border: '2px solid #bcbcbc',
                borderColor: 'action.active',
                padding: 0.3

            }} />
            <FormControl fullWidth margin="normal">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        value={selectedDate}
                        onChange={handleDateChange}

                    />
                </LocalizationProvider>
            </FormControl>
        </Box>
    );
};

export default DatePickerComponent;
