import React, { useState, useEffect } from "react";
import {
    TextField,
    InputAdornment,
    MenuList,
    MenuItem,
    Alert,
} from "@mui/material";
import MenuWrapper from "../../../Common/MenuWrapper";

const validateBreakDuration = (value) => {
    const breakPattern = /^(?:None|\d+\s?(?:min)?)$/;
    return breakPattern.test(value);
};

const formatBreakDuration = (value) => {
    if (value === "None") return 0;
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};

const BreakDurationPicker = ({ formData, handleChange = () => { }, errors, type, setErrors }) => {
    const [breakDuration, setBreakDuration] = useState(formData.breakDuration || "");
    const [anchorEl, setAnchorEl] = useState(null);
    const [tempValue, setTempValue] = useState(formData[type] || ""); // New state for raw input
    const breakDurationOptions = ["None", "10min", "15min", "20min", "30min", "45min", "60min"];

    useEffect(() => {
        setBreakDuration(formData.breakDuration || "");
    }, [formData.breakDuration]);

    const handleDropdownOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (value) => {
        setBreakDuration(value);
        setTempValue(value);
        handleChange("break_duration", formatBreakDuration(value));
        setErrors((prevErrors) => ({ ...prevErrors, [type]: false }));
        setAnchorEl(null);
    };

    const handleTextFieldChange = (e) => {
        const input = e.target.value;
        setTempValue(input); // Update raw input value on typing

        // Validate input on each change
        const valid = validateBreakDuration(input);
        if (valid) {
            setBreakDuration(tempValue)
            handleChange("break_duration", formatBreakDuration(tempValue));
            setErrors((prevErrors) => ({ ...prevErrors, [type]: false }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [type]: true }));
        }
    };

    const handleTextFieldBlur = () => {
        const valid = validateBreakDuration(tempValue);

        if (valid) {
            setBreakDuration(tempValue)
            handleChange("break_duration", formatBreakDuration(tempValue));
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
                errors={errors}
                type={type}
                size="small"
                disabled={Object.keys(errors).some(key => key !== type && errors[key]) ? true : false}
                InputProps={{
                    startAdornment: <InputAdornment position="start">Break</InputAdornment>,
                    endAdornment: errors.break_duration ? (
                        <InputAdornment position="end">
                            <Alert
                                severity="error"
                                sx={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    border: "none",
                                    padding: "0",
                                }}
                            />
                        </InputAdornment>
                    ) : null,
                }}
            />

            <MenuWrapper anchorEl={anchorEl} setAnchorEl={setAnchorEl} >
                <MenuList
                    sx={{
                        maxHeight: 300,
                        overflowY: "auto",
                        padding: "0",
                        flex: 1,
                    }}
                >
                    {breakDurationOptions.map((option) => (
                        <MenuItem
                            key={option}
                            onClick={() => handleSelect(option)}
                            selected={breakDuration === option}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </MenuList>
            </MenuWrapper>
        </>
    );
};

export default BreakDurationPicker;
