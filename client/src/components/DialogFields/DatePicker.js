import React, { useState, useEffect } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

const DatePickerComponent = ({ formData, handleChange }) => {
    const [selectedDate, setSelectedDate] = useState(formData ? dayjs(formData) : null);

    useEffect(() => {
        setSelectedDate(formData ? dayjs(formData) : null); // Update selected date when formData changes
    }, [formData]);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        handleChange("date", newValue ? newValue.format('YYYY-MM-DD') : ''); // Format date for the parent handler
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                value={selectedDate}
                onChange={handleDateChange}
                format="DD MMMM YYYY"
                slotProps={{
                    textField: {
                        size: 'small', sx: {
                            borderRadius: '4px',
                            bgcolor: '#15181b', '& input': {
                                fontSize: '14px',
                                color: 'secondary.main',
                                '&:hover': {
                                    color: '#ebf5ff',
                                }
                            },
                            svg: {
                                color: '#3399ff',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#20242a', // Change the border color
                                    borderRadius: '4px',
                                    width: '100%',
                                    height: '112%',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#303840', // Border color when hovering
                                },

                            },
                        }
                    }
                }
                }

            />
        </LocalizationProvider>
    );
};

export default DatePickerComponent;
