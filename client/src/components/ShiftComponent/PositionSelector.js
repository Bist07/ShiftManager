import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import usePositions from '../../hooks/usePositions';
import { FormControl } from '@mui/material';

const PositionSelector = ({ formData, handleChange }) => {
    const { positions = [], loading } = usePositions(); // Ensure employees is always an array
    const [selectedPosition, setSelectedPosition] = useState([]);

    useEffect(() => {
        if (formData.position_id && positions.length > 0) {
            const initialPosition = formData.position_id.map((id) => {
                const position = positions.find((pos) => pos.position_id === id);
                return {
                    value: id,
                    label: position ? `${position.name}` : id,
                };
            });
            setSelectedPosition(initialPosition);
        }
    }, [formData.position_id, positions]);

    const handlePositionChange = (selectedOptions) => {
        setSelectedPosition(selectedOptions || []);
        const selectedIds = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        handleChange("postion_id", selectedIds); // Pass array of selected IDs to parent
    };

    const positionOptions = positions.map((position) => ({
        value: position.position_id,
        label: `${position.name}`,
    }));

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <CreatableSelect
                    isMulti
                    isClearable
                    isLoading={loading}
                    options={positionOptions}
                    value={selectedPosition}
                    onChange={handlePositionChange}
                    placeholder="Select or create position"
                />
            </FormControl>
        </div>
    );
};

export default PositionSelector;
