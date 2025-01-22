import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import useLocations from '../../hooks/useLocations';
import { FormControl, Box, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const LocationSelector = ({ formData, handleChange }) => {
    const { locations = [], loading } = useLocations();
    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(() => {
        if (formData.location_id && locations.length > 0) {
            const location = locations.find((pos) => pos.location_id === formData.location_id);
            const initialLocation = {
                value: formData.location_id,
                label: location ? `${location.name}` : formData.location_id,
            };
            setSelectedLocation(initialLocation);
        }
    }, [formData.location_id, locations]);


    const handleLocationChange = (selectedOption) => {
        setSelectedLocation(selectedOption || null);
        const selectedId = selectedOption ? selectedOption.value : null; // Extract the value from the single object
        handleChange("location_id", selectedId); // Pass the single selected ID to parent
    };


    const locationOptions = locations.map((location) => ({
        value: location.location_id,
        label: `${location.name}`,
    }));

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 4, paddingRight: 2 }}>
                <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#738190', textAlign: 'right', width: '50%' }}>Location</Typography>
                    <LocationOnOutlinedIcon sx={{
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
                            isClearable
                            isLoading={loading}
                            options={locationOptions}
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            placeholder="Add location"
                            menuPortalTarget={document.body}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: '14px',
                                    backgroundColor: '#15181b',
                                    color: '#98a4b3',
                                    borderColor: '#20242a',
                                    '&:hover': {
                                        borderColor: '#303840',
                                    },
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#98a4b3',
                                    '&:hover': {
                                        backgroundColor: '#303840',
                                    },
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#15181b',
                                    color: '#98a4b3',
                                    fontSize: '14px',

                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                        ? '#3399ff'
                                        : state.isFocused
                                            ? '#303840'
                                            : '#15181b',
                                    color: state.isSelected ? 'white' : '#98a4b3',
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
        </div >
    );
};

export default LocationSelector;
