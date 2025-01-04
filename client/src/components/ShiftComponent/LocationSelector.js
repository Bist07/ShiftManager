import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import useLocations from '../../hooks/useLocations';
import { FormControl } from '@mui/material';

const LocationSelector = ({ formData, handleChange }) => {
    const { locations = [], loading } = useLocations(); // Ensure employees is always an array
    const [selectedLocation, setSelectedLocation] = useState([]);

    useEffect(() => {
        if (formData.location_id && locations.length > 0) {
            const initialLocation = formData.location_id.map((id) => {
                const location = locations.find((loc) => loc.location_id === id);
                return {
                    value: id,
                    label: location ? `${location.name}` : id,
                };
            });
            setSelectedLocation(initialLocation);
        }
    }, [formData.location_id, locations]);

    const handleLocationChange = (selectedOptions) => {
        setSelectedLocation(selectedOptions || []);
        const selectedIds = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        handleChange("location_id", selectedIds); // Pass array of selected IDs to parent
    };

    const locationOptions = locations.map((location) => ({
        value: location.location_id,
        label: `${location.name}`,
    }));

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <CreatableSelect
                    isMulti
                    isClearable
                    isLoading={loading}
                    options={locationOptions}
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    placeholder="Select or create location"
                />
            </FormControl>
        </div>
    );
};

export default LocationSelector;
