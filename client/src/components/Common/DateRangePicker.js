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

const DatePicker = ({ value, onChange, label, isDisabled, minDate, name }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                    onChange(name, date ? date.format('YYYY-MM-DD') : '')
                }

                }
                name={name}
                disabled={isDisabled}
                minDate={minDate ? dayjs(minDate) : null}
                format="DD MMM YYYY"
                slotProps={{
                    textField: {
                        size: 'small',
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
    }, [formData]);

    const handleDateChange = (key, value) => {
        setDateRange({ ...dateRange, [key]: value });
        handleChange(key, value);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Start Date Picker */}
            <DatePicker
                value={dateRange.startDate}
                onChange={(value) => handleDateChange('startDate', value)}
                name="startDate"
                label="Start"
                isDisabled={true}
            />
            {/* End Date Picker */}
            <DatePicker
                value={dateRange.endDate}
                onChange={handleDateChange}
                name="endDate"
                label="End"
                isDisabled={false}
                minDate={dateRange.startDate}
            />
        </Box>
    );
};


export default DateRangePicker;
