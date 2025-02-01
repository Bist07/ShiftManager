import React, { useState, useEffect } from "react";
import {
    TextField,
    Box,
    Popover,
    MenuList,
    MenuItem,
    InputAdornment,
    Alert
} from "@mui/material";
import dayjs from "dayjs";
import MenuWrapper from "./MenuWrapper";

// Utility function for validating and formatting time
const validateAndFormatTime = (input) => {
    const timePattern = /^\d{1,2}:\d{2}\s*(AM|PM)?$/i;
    const match = input?.match(timePattern);

    if (match) {
        let [_, hours, minutes, period] = input.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
        period = period ? period.toUpperCase() : "AM";

        if (parseInt(hours, 10) <= 12 && parseInt(minutes, 10) < 60) {
            return dayjs(`${hours.padStart(2, "0")}:${minutes} ${period}`, "hh:mm A");
        }
    }
    return null;
};

const TimeDropdown = ({ options, selected, onSelect, label }) => (
    <MenuList
        sx={{
            maxHeight: 300,
            overflowY: "auto",
            padding: "0",
            flex: 1,
        }}
    >
        {options.map((option) => (
            <MenuItem
                key={option}
                onClick={() => onSelect(option)}
                selected={selected === option}
            >
                {option}
            </MenuItem>
        ))}
    </MenuList>
);

const formatType = (type) => {
    // Remove everything starting with "_" and capitalize the first letter
    return type.replace(/_.*/, "").replace(/^./, (char) => char.toUpperCase());
};

const TimePicker = ({ formData, handleChange, type, errors, setErrors }) => {
    const [time, setTime] = useState(
        formData[type] ? dayjs(formData, "hh:mm") : null
    );
    const [anchorEl, setAnchorEl] = useState(null);
    const [tempSelection, setTempSelection] = useState({ hours: "", minutes: "", period: "" });
    const [tempValue, setTempValue] = useState(formData[type] || ""); // New state for raw input
    const hours = [...Array(12).keys()].map((n) => String(n + 1).padStart(2, "0"));
    const minutes = [...Array(4).keys()].map((n) => String(n * 15).padStart(2, "0"));
    const periods = ["AM", "PM"];

    useEffect(() => {
        setTempValue(dayjs(formData, "HH:mm").format("hh:mm A") || null);
    }, []);

    useEffect(() => {
        setTime(dayjs(formData, "HH:mm").format("hh:mm A") || null);
    }, [formData, type]);

    const handleDropdownOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (key, value) => {
        const updatedSelection = { ...tempSelection, [key]: value };
        setTempSelection(updatedSelection);

        // Rebuild the tempValue with the current selection
        const newTempValue = `${updatedSelection.hours}:${updatedSelection.minutes} ${updatedSelection.period}`;
        setTempValue(newTempValue); // Update raw input value

        // Trigger validation as well
        const valid = validateAndFormatTime(newTempValue);
        if (valid) {
            if (tempSelection.hours && tempSelection.minutes && tempSelection.period) {
                const formattedTime = `${tempSelection.hours}:${tempSelection.minutes} ${tempSelection.period}`;
                const dayjsTime = dayjs(formattedTime, "hh:mm A");
                setTime(dayjsTime);
                handleChange(type, dayjsTime.format("HH:mm"));

            }
            setErrors((prevErrors) => ({ ...prevErrors, [type]: false })); // Clear error if valid
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [type]: true })); // Set error if invalid
        }
    };

    const handleTextFieldChange = (e) => {
        const input = e.target.value;
        setTempValue(input); // Update raw input value on typing

        // Validate input on each change
        const valid = validateAndFormatTime(input);
        if (valid) {

            const dayjsTime = dayjs(valid, "hh:mm A");
            setTime(dayjsTime);
            handleChange(type, dayjsTime.format("HH:mm"));

            setErrors((prevErrors) => ({ ...prevErrors, [type]: false }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [type]: true }));
        }
    };

    const handleTextFieldBlur = () => {
        const valid = validateAndFormatTime(tempValue);
        if (valid) {

            const dayjsTime = dayjs(valid, "hh:mm A");
            setTime(dayjsTime);
            handleChange(type, dayjsTime.format("HH:mm"));

            setErrors((prevErrors) => ({ ...prevErrors, [type]: false }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [type]: true }));
        }
    };


    return (
        <>
            <TextField
                value={tempValue}
                onClick={Object.keys(errors).some(key => key !== type && errors[key]) ? null : (e) => handleDropdownOpen(e)}
                onChange={handleTextFieldChange}
                onBlur={handleTextFieldBlur}
                error={errors[type]}
                disabled={Object.keys(errors).some(key => key !== type && errors[key]) ? true : false}
                size="small"
                type={type}
                errors={errors}
                InputProps={{
                    startAdornment: <InputAdornment sx={{ fontSize: '14px' }} position="start">{formatType(type)}</InputAdornment>,
                    endAdornment: errors[type] ? (
                        <InputAdornment position="end">
                            <Alert severity="error" sx={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                border: "none",
                                padding: "0",
                            }} />
                        </InputAdornment>
                    ) : null,
                }}
            />

            <MenuWrapper anchorEl={anchorEl} setAnchorEl={setAnchorEl} >
                <TimeDropdown
                    options={hours}
                    selected={tempSelection.hours}
                    onSelect={(value) => handleSelect("hours", value)}
                />
                <TimeDropdown
                    options={minutes}
                    selected={tempSelection.minutes}
                    onSelect={(value) => handleSelect("minutes", value)}
                />
                <TimeDropdown
                    options={periods}
                    selected={tempSelection.period}
                    onSelect={(value) => handleSelect("period", value)}
                />
            </MenuWrapper>
        </>
    );
};

export default TimePicker;
