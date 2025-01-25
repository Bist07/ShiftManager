import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { FormControl, Box, Typography } from '@mui/material';
import { CreatableSelectStyle } from './Styles';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const iconMap = {
    Employee: PersonOutlineRoundedIcon,
    Position: AssignmentOutlinedIcon,
    Location: LocationOnOutlinedIcon,
};

const Selector = ({ name, formData, handleChange, loading, optionIdKey, options, placeHolderText, isMulti }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const IconComponent = iconMap[name];
    useEffect(() => {
        if (formData[optionIdKey] && options?.length > 0) {

            if (isMulti) {
                const initialOptions = formData[optionIdKey].map((id) => {
                    const option = options.find((opt) => opt[optionIdKey] === id);
                    return {
                        value: id,
                        label: option ? `${option.name}` : id,
                    };
                });
                setSelectedOption(initialOptions);
            }
            else {
                const option = options.find((opt) => opt[optionIdKey] === formData[optionIdKey]);
                const initialOption = {
                    value: formData[optionIdKey],
                    label: option ? `${option.name}` : formData[optionIdKey],
                };
                setSelectedOption(initialOption);
            }
        }
    }, [formData[optionIdKey], options]);


    const handleSelectionChange = (selectedOption) => {
        setSelectedOption(selectedOption || null);
        if (isMulti) {
            const selectedIds = selectedOption ? selectedOption.map((opt) => opt.value) : [];
            handleChange(optionIdKey, selectedIds);
        } else {
            const selectedId = selectedOption ? selectedOption.value : null;
            handleChange(optionIdKey, selectedId);
        }
    };

    const formatedOptions = options?.map((option) => ({
        value: option[optionIdKey],
        label: `${option.name}`,
    }));

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 4, paddingRight: 2 }}>
                <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#738190', textAlign: 'right', width: '50%' }}>{name}</Typography>
                    <IconComponent sx={{
                        color: '#9ca6b0',
                        fontSize: '36px',
                        borderRadius: '50px',
                        border: '2px solid #bcbcbc',
                        borderColor: '#9ca6b0',
                        padding: 0.5,

                    }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                    <FormControl fullWidth>
                        <CreatableSelect
                            isMulti={isMulti}
                            isClearable
                            isLoading={loading}
                            options={formatedOptions}
                            value={selectedOption}
                            onChange={handleSelectionChange}
                            placeholder={placeHolderText}
                            menuPortalTarget={document.body}
                            styles={CreatableSelectStyle}
                        />
                    </FormControl>

                </Box>
            </Box>
        </div >
    );
};

export default Selector;
