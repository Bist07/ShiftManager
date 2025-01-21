import React, { useState, useEffect } from "react";
import {
    FormControl,
    TextField,
    Box,
    Typography,
    InputAdornment,
    Popover,
    MenuList,
    MenuItem,
    Alert,
} from "@mui/material";
import dayjs from "dayjs";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const TimePickerComponent = ({ formData, handleChange }) => {
    const [startTime, setStartTime] = useState(
        formData.start_time ? dayjs(formData.start_time, "hh:mm") : null
    );

    const [endTime, setEndTime] = useState(
        formData.end_time ? dayjs(formData.end_time, "hh:mm") : null
    );

    const [breakLength, setBreakLength] = useState(
        formData.breakLength || ''
    );

    const [tempInput, setTempInput] = useState({ start: "", end: "", break: "" }); // Temporary input for typing
    const [error, setError] = useState({ start: false, end: false, break: false }); // Validation errors
    const [anchorEl, setAnchorEl] = useState(null);
    const [dropdownType, setDropdownType] = useState("");
    const [tempSelection, setTempSelection] = useState({ hours: "", minutes: "", period: "" });
    const [startSelection, setStartSelection] = useState({ hours: "", minutes: "", period: "" });
    const [endSelection, setEndSelection] = useState({ hours: "", minutes: "", period: "" });
    const [breakLengthSelection, setBreakLengthSelection] = useState("");

    const hours = [...Array(12).keys()].map((n) => String(n + 1).padStart(2, "0")); // "01" to "12"
    const minutes = [...Array(4).keys()].map((n) => String(n * 15).padStart(2, "0"));
    const periods = ["AM", "PM"];
    const breakLengthOptions = ["None", "10min", "15min", "20min", "30min", "45min", "60min"];

    useEffect(() => {
        setStartTime(dayjs(formData.start_time, "hh:mm") || null);
        setEndTime(dayjs(formData.end_time, "hh:mm") || null);
    }, [formData]);

    const handleDropdownOpen = (type, event) => {
        setDropdownType(type);
        setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = () => {
        if (
            tempSelection.hours &&
            tempSelection.minutes &&
            tempSelection.period
        ) {
            const formattedTime = `${tempSelection.hours}:${tempSelection.minutes} ${tempSelection.period}`;
            if (dropdownType === "start") {
                setStartTime(dayjs(formattedTime, "hh:mm A"));
                handleChange("start_time", dayjs(formattedTime, "hh:mm A").format("HH:mm"));
            } else {
                setEndTime(dayjs(formattedTime, "hh:mm A"));
                handleChange("end_time", dayjs(formattedTime, "hh:mm A").format("HH:mm"));
            }
        }
        setAnchorEl(null);
        setDropdownType("");
    };

    const handleSelect = (type, value) => {
        const newSelection = { [type]: value };
        const updatedSelection = { ...tempSelection, [type]: value };

        // Retain existing values if not overwritten
        if (!updatedSelection.hours && startTime) {
            updatedSelection.hours = startTime.format("hh");
        }
        if (!updatedSelection.minutes && startTime) {
            updatedSelection.minutes = startTime.format("mm");
        }
        if (!updatedSelection.period && startTime) {
            updatedSelection.period = startTime.format("A");
        }

        setTempSelection(updatedSelection);
        if (dropdownType === "start") {
            setStartSelection(updatedSelection);
        } else {
            setEndSelection(updatedSelection);
        }

        const partialTime = `${updatedSelection.hours || "HH"}:${updatedSelection.minutes || "MM"
            } ${updatedSelection.period || "AM/PM"}`;

        handleChange(dropdownType === "start" ? "start_time" : "end_time", dayjs(partialTime, "hh:mm A").format("HH:mm"));

        // Check if all fields are filled before closing the dropdown
        if (newSelection.period) {
            const formattedTime = `${updatedSelection.hours}:${updatedSelection.minutes} ${updatedSelection.period}`;
            if (dropdownType === "start") {
                setStartTime(dayjs(formattedTime, "HH:mm"));
                setTempInput({ ...tempInput, start: formattedTime });
            } else {
                setEndTime(dayjs(formattedTime, "HH:mm"));
                setTempInput({ ...tempInput, end: formattedTime });
            }
            handleDropdownClose();
        }
    };

    const handleBreakLengthSelect = (value) => {
        setBreakLengthSelection(value);
        setTempInput({ ...tempInput, breakLength: value });
        handleChange("break_length", FormatBreakLength(value));
        setAnchorEl(null);
        handleDropdownClose();
    };

    const handleTextFieldChange = (type, value) => {
        setTempInput((prev) => ({ ...prev, [type]: value })); // Update temporary input
    };

    const FormatBreakLength = (value) => {
        let number = 0;
        if (value === "None") {
            number = 0;
        } else {
            // Extract the number using a regex
            const match = value.match(/\d+/); // This will capture the digits in the value
            if (match) {
                number = parseInt(match[0], 10); // Convert the matched digits to an integer
            }
        }
        return number;
    }


    const handleTextFieldBlur = (type) => {
        if (type === "breakLength") {
            // Validate breakLength input
            const value = tempInput.breakLength;
            const breakPattern = /^(?:None|\d+(?:\s?min)?)$/
            const valid = tempInput[type]?.match(breakPattern);
            if (valid) {
                setBreakLength(value);
                handleChange("break_length", FormatBreakLength(value));
                // Clear any errors for this field
                setError((prev) => ({ ...prev, [type]: false }));
            } else {
                setError((prev) => ({ ...prev, [type]: true }));
            }
        } else if (type === "start" || type === "end") {
            // Validate and format time input
            const timePattern = /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i;
            const match = tempInput[type]?.match(timePattern);

            if (match) {
                let [_, hours, minutes, period] = match;

                // Default to AM if period is missing
                period = period ? period.toUpperCase() : "AM";

                // Ensure hours and minutes are within valid ranges
                if (parseInt(hours, 10) <= 12 && parseInt(minutes, 10) < 60) {
                    const formattedTime = `${hours.padStart(2, "0")}:${minutes} ${period}`;
                    const dayjsTime = dayjs(formattedTime, "hh:mm A");

                    // Update start or end time
                    if (type === "start") {
                        setStartTime(dayjsTime);
                        handleChange("start_time", dayjsTime.format("HH:mm"));
                    } else {
                        setEndTime(dayjsTime);
                        handleChange("end_time", dayjsTime.format("HH:mm"));
                    }

                    // Clear any errors for this field
                    setError((prev) => ({ ...prev, [type]: false }));
                } else {
                    // Invalid hours or minutes
                    setError((prev) => ({ ...prev, [type]: true }));
                }
            } else {
                // Invalid time format
                setError((prev) => ({ ...prev, [type]: true }));
            }
        }
    };


    return (
        <Box sx={{ display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 4, paddingRight: 2 }}>
            <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                <Typography
                    sx={{ fontSize: "15px", fontWeight: 600, color: "action.active", textAlign: 'right', width: '50%' }}
                >
                    Time
                </Typography>
                <AccessTimeRoundedIcon
                    sx={{
                        color: "action.active",
                        fontSize: "36px",
                        borderRadius: "50px",
                        padding: 0.5,
                        border: "2px solid #bcbcbc",
                        borderColor: "action.active",
                    }}
                />

            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                <FormControl fullWidth>
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                        {/* Start Time */}
                        <TextField
                            value={tempInput.start || (startTime ? startTime.format("hh:mm A") : "")}
                            onClick={!!(error.breakLength || error.end) ? null : (e) => handleDropdownOpen("start", e)}
                            onChange={(e) => handleTextFieldChange("start", e.target.value)}
                            onBlur={() => handleTextFieldBlur("start")}
                            placeholder="HH:mm AM"
                            error={error.start}
                            size='small'
                            disabled={!!(error.breakLength || error.end)}
                            sx={{
                                width: error.start
                                    ? '50%'
                                    : error.breakLength
                                        ? '35%'
                                        : error.end
                                            ? '25%'
                                            : '37.5%',
                                bgcolor: '#fff',
                                '& input': {
                                    fontSize: '14px',
                                },
                                '& .MuiInputAdornment-root': {
                                    fontSize: '14px',  // Adjust for adornment
                                    '& .MuiTypography-root': {
                                        fontSize: '14px',  // Specifically target text inside the adornment
                                    }
                                },
                                '& .MuiInputAdornment-positionEnd': {
                                    mr: -2,

                                },
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment sx={{ fontSize: '14px' }} position="start">Start</InputAdornment>,
                                endAdornment: error.start ? (
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
                        {/* End Time */}
                        <TextField

                            value={tempInput.end || (endTime ? endTime.format("hh:mm A") : "")}
                            onClick={!!(error.start || error.breakLength) ? null : (e) => handleDropdownOpen("end", e)}
                            onChange={(e) => handleTextFieldChange("end", e.target.value)}
                            onBlur={() => handleTextFieldBlur("end")}
                            placeholder="HH:mm AM"
                            error={error.end}
                            size='small'
                            disabled={!!(error.start || error.breakLength)}
                            sx={{
                                width: error.end
                                    ? '50%'
                                    : error.breakLength
                                        ? '35%'
                                        : error.start
                                            ? '25%'
                                            : '37.5%',
                                bgcolor: '#fff',
                                '& input': {
                                    fontSize: '14px',
                                },
                                '& .MuiInputAdornment-root': {
                                    fontSize: '14px',  // Adjust for adornment
                                    '& .MuiTypography-root': {
                                        fontSize: '14px',  // Specifically target text inside the adornment
                                    }
                                },
                                '& .MuiInputAdornment-positionEnd': {
                                    mr: -2,

                                },
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">End</InputAdornment>,
                                endAdornment: error.end ? (
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
                        {/* Break */}
                        <TextField
                            value={tempInput.breakLength}
                            onClick={!!(error.start || error.end) ? null : (e) => handleDropdownOpen("breakLength", e)}
                            onChange={(e) => handleTextFieldChange("breakLength", e.target.value)}
                            onBlur={() => handleTextFieldBlur("breakLength")}
                            error={error.breakLength}
                            size='small'
                            disabled={!!(error.start || error.end)}
                            sx={{
                                width: error.breakLength
                                    ? '50%'
                                    : error.start
                                        ? '20%'
                                        : error.end
                                            ? '20%'
                                            : '33.33%',
                                bgcolor: '#fff',
                                '& input': {
                                    fontSize: '14px',
                                },
                                '& .MuiInputAdornment-root': {
                                    fontSize: '14px',  // Adjust for adornment
                                    '& .MuiTypography-root': {
                                        fontSize: '14px',  // Specifically target text inside the adornment
                                    }
                                },
                                '& .MuiInputAdornment-positionEnd': {
                                    mr: -2,

                                },
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Break</InputAdornment>,
                                endAdornment: error.breakLength ? (
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
                    </Box>
                </FormControl>
            </Box>
            {/* Dropdown Menu for Break */}
            <Popover
                open={dropdownType === "breakLength"}
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
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        width: 'auto'

                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0,
                            mt: 0.5,
                            mb: 0.5,
                            width: '100%'
                        }}
                    >
                        <MenuList
                            sx={{
                                maxHeight: 300,
                                overflowY: "auto",
                                padding: "0",
                                backgroundColor: "#fff",
                                flex: 1,

                            }}>
                            {breakLengthOptions.map((option) => (
                                <MenuItem
                                    key={option}
                                    onClick={() => handleBreakLengthSelect(option)}
                                    selected={breakLengthSelection === option}
                                    sx={{
                                        fontSize: '14px',
                                        "&:hover": {
                                            backgroundColor: "#deebff",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "#2684ff",
                                            color: "#fff",
                                        },

                                    }}>
                                    {option}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Box></Box>
            </Popover >

            <Popover
                open={dropdownType === "start" || dropdownType === "end"}
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
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        width: 'auto'

                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0,
                            mt: 0.5,
                            mb: 0.5,
                            width: '100%'
                        }}
                    >
                        {/* Hours */}
                        <MenuList
                            sx={{
                                maxHeight: 300,
                                overflowY: "auto",
                                padding: "0",
                                backgroundColor: "#fff",
                                width: "33.33%",
                                flex: 1,
                            }}
                        >
                            {hours.map((hour) => (
                                <MenuItem
                                    key={hour}
                                    onClick={() => handleSelect("hours", hour)}
                                    selected={
                                        (dropdownType === "start" ? startSelection : endSelection).hours === hour
                                    }
                                    sx={{
                                        fontSize: '14px',
                                        "&:hover": {
                                            backgroundColor: "#deebff",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "#2684ff",
                                            color: "#fff",
                                        },

                                    }}
                                >
                                    {hour}
                                </MenuItem>
                            ))}
                        </MenuList>

                        {/* Minutes */}
                        <MenuList
                            sx={{
                                maxHeight: 300,
                                overflowY: "auto",
                                padding: "0",
                                backgroundColor: "#fff",
                                width: "33.33%",
                                flex: 1,

                            }}
                        >
                            {minutes.map((minute) => (
                                <MenuItem
                                    key={minute}
                                    onClick={() => handleSelect("minutes", minute)}
                                    selected={
                                        (dropdownType === "start" ? startSelection : endSelection).minutes === minute
                                    }
                                    sx={{
                                        fontSize: '14px',
                                        "&:hover": {
                                            backgroundColor: "#deebff",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "#2684ff",
                                            color: "#fff",
                                        },

                                    }}
                                >
                                    {minute}
                                </MenuItem>
                            ))}
                        </MenuList>

                        {/* Period */}
                        <MenuList
                            sx={{
                                maxHeight: 300,
                                overflowY: "auto",
                                padding: "0",
                                backgroundColor: "#fff",
                                width: "33.33%",
                                flex: 1,
                            }}
                        >
                            {periods.map((period) => (
                                <MenuItem
                                    key={period}
                                    onClick={() => handleSelect("period", period)}
                                    selected={
                                        (dropdownType === "start" ? startSelection : endSelection).period === period
                                    }
                                    sx={{
                                        fontSize: '14px',
                                        "&:hover": {
                                            backgroundColor: "#deebff",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "#2684ff",
                                            color: "#fff",
                                        },

                                    }}
                                >
                                    {period}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Box>
                </Box>
            </Popover>
        </Box >
    );
};

export default TimePickerComponent;
