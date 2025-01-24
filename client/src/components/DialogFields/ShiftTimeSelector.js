import React, { useState } from "react";
import {
    FormControl,
    Box,
    Typography,
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BreakDurationSelector from './BreakDurationSelector';
import TimePicker from "./TimePicker";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";

dayjs.extend(duration);

const ShiftTimeSelector = ({ formData, handleChange }) => {

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
        setShiftTime((prev) => ({ ...prev, [key]: value }));
        const validation = validateShiftTime(shiftTime);
        if (!validation.valid) {
            console.error(validation.error); // Logs the error message if validation fails
        } else {
            handleChange(key, value);
        }


    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: "center",
                gap: 2,
                margin: 1,
                paddingLeft: 4,
                paddingRight: 2,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#738190",
                        textAlign: 'right',
                        width: '50%',
                    }}
                >
                    Time
                </Typography>

                <AccessTimeRoundedIcon
                    sx={{
                        color: "secondary.main",
                        fontSize: "36px",
                        borderRadius: "50px",
                        padding: 0.5,
                        border: "2px solid #bcbcbc",
                        borderColor: "secondary.main",
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                <FormControl fullWidth>
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
                </FormControl>
            </Box>
        </Box>
    );
};

export default ShiftTimeSelector;
