import React from 'react';
import { Menu, MenuItem, Checkbox, ListItemText, IconButton } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { renderButtonText } from '../../../utils/utils';

const PositionFilter = ({ anchorEl, setAnchorEl, filters, handleSelectFilter, positions }) => {
    const handleToggle = (position) => {
        handleSelectFilter('positionsFilters', position.role_id);
    };
    return (
        <>
            <IconButton
                aria-controls="position-menu"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant='outlined'
                sx={{
                    color: filters.employeeFilters.length > 0 ? '#1c74d4' : '#626262',
                    fontSize: '15px',
                    textTransform: 'none',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    gap: '8px',
                    borderRadius: '5px',
                    border: '1px solid #bcbcbc', // Add border to mimic outlined style
                    borderColor: '#bcbcbc',
                    '&:hover': {
                        borderColor: Object.keys(filters.positionsFilters).length > 0 ? '#1c74d4' : '#bcbcbc',
                    },
                }}
            >
                <AssignmentIcon sx={{ fontSize: '20px' }} />
                {renderButtonText(filters.positionsFilters, 'Position')}
            </IconButton>
            <Menu
                id="position-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {positions.map((position) => (
                    <MenuItem key={position.role_id} onClick={() => handleToggle(position)}>
                        <Checkbox checked={filters.positionsFilters.includes(position.role_id)} />
                        <ListItemText primary={position.name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default PositionFilter;
