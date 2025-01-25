import React, { useEffect } from 'react';
import {
    TextField,
    InputAdornment,
    Box
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DatePicker = ({ value, onChange, label, isDisabled, minDate }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                value={value ? dayjs(value) : null}
                onChange={(date) =>
                    onChange(date ? date.format('YYYY-MM-DD') : '')
                }
                disabled={isDisabled}
                minDate={minDate ? dayjs(minDate) : null}
                format="DD MMM YYYY"
                slotProps={{
                    textField: {
                        size: 'small', sx: {
                            borderRadius: '4px',
                            bgcolor: '#15181b', '& input': {
                                fontSize: '14px',
                                color: '.main',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#20242a', // Change the border color
                                    borderRadius: '4px',
                                    width: '100%',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#303840', // Border color when hovering
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#15181b',
                                    '& input': {
                                        fontSize: '14px',
                                    },
                                    '& fieldset': {
                                        borderColor: '#20242a',
                                        borderRadius: '4px',
                                    },
                                },
                                '& .MuiInputAdornment-root .MuiTypography-root': {
                                    fontSize: '12px',
                                    color: '#5f7183',
                                },
                            },
                        },
                        InputProps: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    {label}
                                </InputAdornment>
                            ),
                        },
                    },
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};


const DateRangePicker = ({ formData, handleChange }) => {
    const [dateRange, setDateRange] = React.useState({
        startDate: formData.startDate || '',
        endDate: formData.endDate || '',
    });

    useEffect(() => {
        setDateRange({
            startDate: formData.startDate || '',
            endDate: formData.endDate || '',
        });
    }, []);

    const handleDateChange = (key, value) => {
        const updatedRange = { ...dateRange, [key]: value };
        setDateRange(updatedRange);
        handleChange(updatedRange); // Send updated range back to the parent
    };



    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Start Date Picker */}
            <DatePicker
                value={dateRange.startDate}
                onChange={(value) => handleDateChange('startDate', value)}
                label="Start"
                isDisabled={true}
            />
            {/* End Date Picker */}
            <DatePicker
                value={dateRange.endDate}
                onChange={(value) => handleDateChange('endDate', value)}
                label="End"
                isDisabled={false}
                minDate={dateRange.startDate}
            />
        </Box>
    );
};


export default DateRangePicker;
