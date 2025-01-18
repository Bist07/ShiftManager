import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, FormControl } from '@mui/material';
import dayjs from 'dayjs';

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
        <FormControl fullWidth margin="normal">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
            </LocalizationProvider>
        </FormControl>
    );
};

export default DatePickerComponent;
