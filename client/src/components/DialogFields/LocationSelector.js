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
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Typography sx={{ ml: 2, mr: 1, my: 2, fontSize: '15px', fontWeight: 600, color: 'action.active' }}>Location</Typography>
                <LocationOnOutlinedIcon sx={{
                    color: 'action.active', mr: 1, my: 1,
                    fontSize: '36px',
                    stroke: "#ffffff", strokeWidth: 0.5,
                    borderRadius: '50px',
                    border: '2px solid #bcbcbc',
                    borderColor: 'action.active',

                }} />
                <FormControl fullWidth margin="normal">
                    <CreatableSelect
                        isClearable
                        isLoading={loading}
                        options={locationOptions}
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        placeholder="Add location"
                        menuPortalTarget={document.body} // Render dropdown outside parent container
                        styles={{
                            menuPortal: (base) => ({
                                ...base,
                                zIndex: 1300, // Adjust z-index to make dropdown appear on top
                            }),
                        }}
                    />
                </FormControl>
            </Box>
        </div>
    );
};

export default LocationSelector;
