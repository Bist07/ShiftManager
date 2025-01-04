import React from 'react';
import { Menu, MenuItem, Checkbox, ListItemText, IconButton, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { renderButtonText } from '../../../utils/utils';

const LocationFilter = ({ anchorEl, setAnchorEl, filters, handleSelectFilter, locations }) => {
    const handleToggle = (location) => {
        handleSelectFilter('locationsFilters', location.location_id);
    };

    const handleClear = () => {
        handleSelectFilter('locationsFilters', 'clear'); // Custom logic to clear all
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls="location-menu"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant='outlined'
                sx={{
                    color: Object.keys(filters.locationsFilters).length > 0 ? 'primary.main' : '#626262',
                    fontSize: '15px',
                    textTransform: 'none',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    gap: '8px',
                    borderRadius: '5px',
                    border: '1px solid #bcbcbc', // Add border to mimic outlined style
                    borderColor: '#bcbcbc',
                    '&:hover': {
                        borderColor: Object.keys(filters.locationsFilters).length > 0 ? '#1c74d4' : '#bcbcbc',
                    },
                }}
            >
                <PlaceIcon />
                {renderButtonText(filters.locationsFilters, 'Location')}

            </IconButton>
            <Menu
                id="location-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >

                {/* Clear button */}
                {filters.locationsFilters.length > 0 && (
                    <MenuItem onClick={handleClear} sx={{ justifyContent: 'center', color: 'error.main' }}>
                        <Button variant="text" color="error">
                            Clear
                        </Button>
                    </MenuItem>
                )}

                {locations.map((location) => (
                    <MenuItem key={location.location_id} onClick={() => handleToggle(location)}>
                        <Checkbox checked={filters.locationsFilters.includes(location.location_id)} />
                        <ListItemText primary={location.name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LocationFilter;
