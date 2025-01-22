import React from 'react';
import { Menu, MenuItem, Checkbox, ListItemText, IconButton, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { renderButtonText } from '../../utils/utils';

const LocationFilter = ({ anchorEl, setAnchorEl, filters, handleSelectFilter, locations }) => {
    const handleToggle = (location) => {
        handleSelectFilter('locationFilters', location.location_id);
    };

    const handleClear = () => {
        handleSelectFilter('locationFilters', 'clear'); // Custom logic to clear all
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls="location-menu"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    color: filters.locationFilters.length > 0 ? 'primary.main' : 'secondary.main',
                }}
            >
                <PlaceIcon />
                {renderButtonText(filters.locationFilters, 'Location')}

            </IconButton>
            <Menu
                id="location-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >

                {/* Clear button */}
                {filters.locationFilters.length > 0 && (
                    <MenuItem onClick={handleClear} sx={{ justifyContent: 'center', color: 'error.main' }}>
                        <Button variant="text" color="error">
                            Clear
                        </Button>
                    </MenuItem>
                )}

                {locations.map((location) => (
                    <MenuItem key={location.location_id} onClick={() => handleToggle(location)}>
                        <Checkbox checked={filters.locationFilters.includes(location.location_id)} />
                        <ListItemText primary={location.name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LocationFilter;
