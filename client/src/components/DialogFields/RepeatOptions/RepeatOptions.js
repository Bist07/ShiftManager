import React, { useEffect, useState } from 'react';
import {
    Box,
    FormControl,
    Typography,
} from '@mui/material';

import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CreatableSelect from 'react-select/creatable';
import DaysToggle from './DaysToggle';
import DateRangePicker from './DateRangePicker';

const filterData = [
    { name: 'RepeatFrequency', data: '', optionIdKey: '', placeHolder: "Select repeat frequency", isMulti: false },
];

const RepeatOptions = ({ formData, handleChange }) => {
    const [dateData, setDateData] = useState({ startDate: formData.startDate, endDate: formData.endDate });
    useEffect(() => {
        setDateData({ startDate: formData.startDate, endDate: formData.endDate });
    }, [formData.startDate]);


    const [repeatOptions, setRepeatOptions] = React.useState(formData || {});
    const frequencyMapping = {
        'Never': 0,
        'This week': 1,
        'Every week': 7,
        'Every 2 weeks': 14,
        'Every 3 weeks': 21,
        'Every 4 weeks': 28,
        'Every 5 weeks': 35,
        'Every 6 weeks': 42,
        'Every 7 weeks': 49,
        'Every 8 weeks': 56,
    };

    const frequencyOptions = Object.entries(frequencyMapping).map(([key, value]) => ({
        value,
        label: key,
    }));

    const handleRepeatOptionsChange = (event, newDays) => {
        const { name, value } = event?.target;
        setRepeatOptions((prev) => {
            const updatedOptions = { ...prev };

            // Handle days selection correctly
            if (name === 'days') {
                updatedOptions.days = newDays || []; // Update the days
            } else if (name === 'frequency') {
                if (value !== 0) {
                    updatedOptions.frequency = value || ''; // Update frequency
                }
            } else {
                updatedOptions[name] = value; // Update other properties
            }

            // Pass the updated options back to the parent component
            handleChange('repeat', updatedOptions);

            return updatedOptions;
        });
    };

    console.log(repeatOptions)


    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', bgcolor: '#181818'
            , width: '100%', ml: 0, mr: 0
        }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 4, paddingRight: 2 }}>
                {/* Frequency Selection */}
                <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#738190', textAlign: 'right', width: '50%' }}>Repeat</Typography>
                    <EventRepeatIcon sx={{
                        color: 'secondary.main',
                        fontSize: '36px',
                        borderRadius: '50px',
                        border: '2px solid #bcbcbc',
                        borderColor: 'secondary.main',
                        padding: 0.5
                    }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                    <FormControl fullWidth>
                        <CreatableSelect
                            options={frequencyOptions}
                            value={frequencyOptions.find(option => option.value === repeatOptions.frequency)}
                            onChange={(e) => handleRepeatOptionsChange({ target: { name: 'frequency', value: e.value || '' } })}
                            placeholder="Select repeat frequency"
                            menuPortalTarget={document.body} // Render dropdown outside parent container
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: '14px',
                                    backgroundColor: '#15181b',
                                    color: '#b6bec9',
                                    borderColor: '#20242a',
                                    '&:hover': {
                                        borderColor: '#303840',
                                    },
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#b6bec9',
                                    '&:hover': {
                                        backgroundColor: '#303840',
                                    },
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#15181b',
                                    color: '#b6bec9',
                                    fontSize: '14px',

                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                        ? '#3399ff'
                                        : state.isFocused
                                            ? '#303840'
                                            : '#15181b',
                                    color: state.isSelected ? 'white' : '#b6bec9',
                                    '&:hover': {
                                        backgroundColor: '#303840',
                                    },
                                }),
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 1300,
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: '#5f7183',
                                }),
                            }}
                        />
                    </FormControl>
                </Box>
            </Box>

            {/* Days of the Week Selection */}
            {
                repeatOptions.frequency > 0 && (
                    <DaysToggle formData={formData.days} handleChange={handleRepeatOptionsChange} />
                )
            }

            {/* Start and End Dates */}
            {
                repeatOptions.frequency > 1 && (
                    <Box>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: "center", gap: 2, margin: 1, mt: 0, paddingLeft: 4, paddingRight: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: "center", width: "75%", gap: 2 }}>
                                <DateRangePicker formData={dateData} handleChange={handleRepeatOptionsChange} />
                            </Box>
                        </Box>
                    </Box>)
            }
        </Box >

    );
};

export default RepeatOptions;
