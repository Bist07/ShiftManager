import React, { useState } from "react";
import {
    FormControl,
    Box,
    Typography,
} from "@mui/material";
import BreakDurationSelector from './BreakDurationPicker';
import TimePicker from "./TimePicker";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import PropTypes from 'prop-types';

dayjs.extend(duration);

const ShiftTimePicker = ({ formData, handleChange }) => {

    const [shiftTime, setShiftTime] = useState({
        start_time: formData?.start_time || '',
        end_time: formData?.end_time || '',
        break_duration: formData?.break_duration || '',
    });

    const [error, setError] = useState({
        start_time: false,
        end_time: false,
        break_duration: false,
    });

    const validateShiftTime = (shiftData) => {
        const { start_time, end_time, break_duration } = shiftData;

        const startTime = dayjs(start_time, "HH:mm");
        const endTime = dayjs(end_time, "HH:mm");

        if (!startTime.isBefore(endTime)) {
            return {
                valid: false,
                error: "Start time must be before end time.",
            };
        }

        const shiftDuration = endTime.diff(startTime, "minute");

        const breakDuration = parseInt(break_duration, 10) || 0;

        if (breakDuration >= shiftDuration) {
            return {
                valid: false,
                error: "Break duration cannot be longer than or equal to the shift duration.",
            };
        }

        return { valid: true };
    };

    const handleShiftTimeChange = (key, value) => {

        const updatedShiftTimes = {
            ...shiftTime,
            [key]: value,
        };

        const validation = validateShiftTime(updatedShiftTimes);
        if (!validation.valid) {
            console.error(validation.error); // Logs the error message if validation fails
        } else {

            setShiftTime(updatedShiftTimes);
            handleChange(key, updatedShiftTimes);
        }


    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
            {/* Start Time  Selector */}
            <TimePicker formData={shiftTime.start_time}
                handleChange={(key, value) => handleShiftTimeChange("start_time", value)}
                errors={error}
                setErrors={setError}
                type={'start_time'}
            />
            {/* End Time  Selector */}
            <TimePicker formData={shiftTime.end_time}
                handleChange={(key, value) => handleShiftTimeChange("end_time", value)}
                errors={error}
                setErrors={setError}
                type={'end_time'}
            />
            {/* Break Duration Selector */}
            <BreakDurationSelector
                formData={shiftTime.break_duration}
                handleChange={(key, value) => handleShiftTimeChange("break_duration", value)}
                errors={error}
                setErrors={setError}
                type={'break_duration'}
            />
        </Box>

    );
};

ShiftTimePicker.propTypes = {
    formData: PropTypes.shape({
        start_time: PropTypes.string.isRequired,
        end_time: PropTypes.string.isRequired,
        break_duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};


export default ShiftTimePicker;
