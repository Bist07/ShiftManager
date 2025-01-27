import React, { useState, useEffect } from "react";
import {
    TextField,
    Box,
    InputAdornment,
    Popover,
    MenuList,
    MenuItem,
    Alert,
} from "@mui/material";

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
                size="small"
                disabled={Object.keys(errors).some(key => key !== type && errors[key]) ? true : false}
                sx={{
                    borderRadius: "4px",
                    width: errors[type]
                        ? '40%'
                        : Object.keys(errors).some(key => key !== type && errors[key])
                            ? '25%'
                            : '32.5%',
                    backgroundColor: "#15181b",
                    "& input": {
                        borderRadius: "4px",
                        fontSize: "14px",
                        color: "secondary.main",
                        "&:hover": {
                            color: "#ebf5ff",
                        },
                    },
                    "& .MuiInputAdornment-root": {
                        "& .MuiTypography-root": {
                            fontSize: "12px",
                            color: "#5f7183",
                        },
                    },
                    "& .MuiInputAdornment-positionEnd": {
                        mr: -2,
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#20242a",
                        },
                        "&:hover fieldset": {
                            borderColor: errors[type] ? theme => theme.palette.error.main : '#303840',
                        },
                        "&.Mui-disabled": {
                            backgroundColor: "#15181b",
                            "& input": {
                                fontSize: "14px",
                            },
                            "& fieldset": {
                                borderColor: "#20242a",
                                borderRadius: "4px",
                            },
                        },
                    },
                }}
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

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleDropdownClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1), 0px -3px 6px rgba(0, 0, 0, 0.1)",
                    padding: "0",
                    marginTop: "6px",
                    width: "auto",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 0,
                        padding: 0,
                        border: "1px solid #e0e0e0",
                        borderColor: "#101010",
                        borderRadius: "4px",
                        backgroundColor: "#15181b",
                        width: "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0,
                            mt: 0.5,
                            mb: 0.5,
                            width: "100%",
                        }}
                    >
                        <MenuList
                            sx={{
                                maxHeight: 300,
                                overflowY: "auto",
                                padding: "0",
                                flex: 1,
                                backgroundColor: "#15181b",
                            }}
                        >
                            {breakDurationOptions.map((option) => (
                                <MenuItem
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    selected={breakDuration === option}
                                    sx={{
                                        fontSize: "14px",
                                        color: "secondary.main",
                                        "&:hover": {
                                            backgroundColor: "#303840",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "#2684ff",
                                            color: "#fff",
                                        },
                                        "&.Mui-selected:hover": {
                                            bgcolor: "#0077e5",
                                        },
                                    }}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default BreakDurationPicker;
