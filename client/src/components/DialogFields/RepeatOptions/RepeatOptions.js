import React, { useEffect } from 'react';
import {
    Box,
    FormControl,
    Typography,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    InputAdornment,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import CreatableSelect from 'react-select/creatable';

const RepeatOptions = ({ formData, handleChange }) => {
    const [repeatOptions, setRepeatOptions] = React.useState({
        frequency: '',
        days: [],
        startDate: formData.date,
        endDate: '',
    });

    const dayMapping = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
    };

    const frequencyMapping = {
        'this-week': 1,
        'every-week': 7,
        'every-2-weeks': 14,
        'every-3-weeks': 21,
        'every-4-weeks': 28,
        'every-5-weeks': 35,
        'every-6-weeks': 42,
        'every-7-weeks': 49,
        'every-8-weeks': 56,
    };

    const reverseFrequencyMapping = Object.fromEntries(
        Object.entries(frequencyMapping).map(([key, value]) => [value, key])
    );

    const frequencyOptions = Object.entries(frequencyMapping).map(([key, value]) => ({
        value,
        label: key,
    }));

    useEffect(() => {
        setRepeatOptions((prev) => ({
            ...prev,
            startDate: formData.date,
        }));
    }, [formData.date]);

    const handleRepeatOptionsChange = (event, newDays) => {
        const { name, value } = event.target;

        setRepeatOptions((prev) => {
            const updatedOptions = { ...prev };

            // Handle days selection correctly
            if (name === 'days') {
                updatedOptions.days = newDays || [];
            } else if (name === 'frequency') {
                updatedOptions.frequency = value || '';
            } else {
                updatedOptions[name] = value;
            }

            handleChange('repeat', updatedOptions);
            return updatedOptions;
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#eaeef2', width: '100%' }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 1, }}>
                {/* Frequency Selection */}
                <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'action.active', textAlign: 'right', width: '50%' }}>Repeat</Typography>
                    <EventRepeatIcon sx={{
                        color: 'action.active',
                        fontSize: '36px',
                        borderRadius: '50px',
                        border: '2px solid #bcbcbc',
                        borderColor: 'action.active',
                        padding: 0.5
                    }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                    <FormControl fullWidth>
                        <CreatableSelect
                            isClearable
                            options={frequencyOptions}
                            value={frequencyOptions.find(option => option.value === repeatOptions.frequency)}
                            onChange={(e) => handleRepeatOptionsChange({ target: { name: 'frequency', value: e.value } })}
                            placeholder="Select repeat frequency"
                            menuPortalTarget={document.body} // Render dropdown outside parent container
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: '14px', // Set font size for selected option
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    fontSize: '14px', // Set font size for items in the dropdown menu
                                }),
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 1300, // Adjust z-index to make dropdown appear on top
                                }),
                            }}
                        />
                    </FormControl>
                </Box>
            </Box>
            <Box>
                {/* Days of the Week Selection */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                        <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'action.active', textAlign: 'right', width: '50%' }}>Days</Typography>
                        <AddIcon sx={{
                            color: 'action.active',
                            fontSize: '36px',
                            borderRadius: '50px',
                            border: '2px solid #bcbcbc',
                            borderColor: 'action.active',
                            padding: 0.5
                        }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                        <FormControl fullWidth>
                            <ToggleButtonGroup
                                sx={{ bgcolor: '#ffff' }}
                                size='small'
                                value={repeatOptions.days}
                                onChange={(e, newDays) => handleRepeatOptionsChange(e, newDays)}
                                name="days"
                                fullWidth
                                aria-label="days of the week"
                            >
                                {Object.keys(dayMapping).map((day) => (
                                    <ToggleButton
                                        name="days"
                                        key={day}
                                        value={dayMapping[day]}
                                        aria-label={day}
                                        sx={{
                                            color: '#0085ff',
                                            "&:hover": {
                                                backgroundColor: "#deebff",
                                            },
                                            "&.Mui-selected": {
                                                backgroundColor: "#2684ff",
                                                color: "#fff",
                                            },
                                        }}
                                    >
                                        {day}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </FormControl>
                    </Box>
                </Box>
            </Box>

            {/* Start and End Dates */}
            {repeatOptions.frequency > 1 && (
                <Box>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: "center", width: "75%", gap: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    sx={{
                                        bgcolor: '#dee2e6', '& input': {
                                            fontSize: '14px',

                                        },
                                        '& label': {
                                            fontSize: '14px',

                                        },
                                        '& .MuiInputAdornment-root': {
                                            fontSize: '14px',  // Adjust for adornment
                                            '& .MuiTypography-root': {
                                                fontSize: '14px',  // Specifically target text inside the adornment
                                            }
                                        },
                                    }}
                                    value={repeatOptions.startDate ? dayjs(repeatOptions.startDate) : null}
                                    disabled // Lock the start date
                                    format="DD MMM YYYY"
                                    slotProps={{
                                        textField: {
                                            size: 'small', InputProps: {
                                                startAdornment: <InputAdornment position="start">Start</InputAdornment>,
                                            }
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                                <MobileDatePicker
                                    sx={{
                                        bgcolor: '#fff', '& input': {
                                            fontSize: '14px',
                                        },
                                        '& .MuiInputAdornment-root': {
                                            fontSize: '14px',  // Adjust for adornment
                                            '& .MuiTypography-root': {
                                                fontSize: '14px',  // Specifically target text inside the adornment
                                            }
                                        },

                                    }}
                                    minDate={dayjs(repeatOptions.startDate)}
                                    value={repeatOptions.endDate ? dayjs(repeatOptions.endDate) : null}
                                    onChange={(date) => handleRepeatOptionsChange({ target: { name: 'endDate', value: date ? date.format('YYYY-MM-DD') : '' } })}
                                    format="DD MMM YYYY"
                                    slotProps={{
                                        textField: {
                                            size: 'small', InputProps: {
                                                startAdornment: <InputAdornment position="start" >End</InputAdornment>,
                                            }
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} />}

                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </Box>)}
        </Box>

    );
};

export default RepeatOptions;
