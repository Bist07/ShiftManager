import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DaysToggle from './DaysToggle';
import { DialogRow } from '../';
import { Selector, DateRangePicker } from '../../../../Common';
import PropTypes from 'prop-types';

const RepeatOptions = ({ formData, handleChange }) => {
    const [dateData, setDateData] = useState({ startDate: formData.startDate, endDate: formData.endDate });
    const [repeatOptions, setRepeatOptions] = useState(formData || {});

    useEffect(() => {
        setDateData({ startDate: formData.startDate, endDate: formData.endDate });
    }, [formData.startDate, formData.endDate]);

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
        frequency: value,
        name: key,
    }));

    const handleRepeatOptionsChange = (key, value) => {
        const updatedOptions = {
            ...repeatOptions,
            [key]: value,
        };
        setRepeatOptions(updatedOptions);
        handleChange('repeat', updatedOptions);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', width: '100%' }}>
            <DialogRow iconName={'Repeat'}
                field={<Selector
                    name="Repeat"
                    formData={repeatOptions.frequency}
                    handleChange={(key, value) => handleRepeatOptionsChange('frequency', value)}
                    options={frequencyOptions}
                    optionIdKey="frequency"
                    placeHolderText="Select repeat frequency"
                    isMulti={false}
                />} />

            {repeatOptions.frequency > 0 && (
                <Box>
                    <DaysToggle formData={formData.days} handleChange={(key, value) => handleRepeatOptionsChange('days', value)} />
                    {repeatOptions.frequency > 1 && (

                        <DialogRow field={<DateRangePicker formData={dateData} handleChange={(key, value) => handleRepeatOptionsChange('dateRange', value)} />}
                        />


                    )}
                </Box>
            )}
        </Box>
    );
};

RepeatOptions.propTypes = {
    formData: PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        frequency: PropTypes.number,
        days: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default RepeatOptions;
