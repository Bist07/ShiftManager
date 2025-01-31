import React, { useState, useEffect } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DatePickerComponent = ({ formData, handleChange }) => {
    const [selectedDate, setSelectedDate] = useState(formData ? dayjs(formData) : null);

    useEffect(() => {
        setSelectedDate(formData ? dayjs(formData) : null);
    }, [formData]);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        handleChange("date", newValue ? newValue.format('YYYY-MM-DD') : '');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                value={selectedDate}
                onChange={handleDateChange}
                format="DD MMMM YYYY"
                slotProps={{
                    textField: {
                        size: 'small'
                    }
                }
                }

            />
        </LocalizationProvider>
    );
};

export default DatePickerComponent;
