import React, { useState, useEffect } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import TodayIcon from '@mui/icons-material/Today';

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

        <Box sx={{ display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 4, paddingRight: 2 }}>
            <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#738190', textAlign: 'right', width: '50%' }}>Date</Typography>
                <TodayIcon sx={{
                    color: 'secondary.main',
                    fontSize: '36px',
                    borderRadius: '50px',
                    border: '2px solid #bcbcbc',
                    borderColor: '#9ca6b0',
                    padding: 0.5,
                }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                <FormControl fullWidth >
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
                </FormControl>
            </Box>
        </Box>
    );
};

export default DatePickerComponent;
