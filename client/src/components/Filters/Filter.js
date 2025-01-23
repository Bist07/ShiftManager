import React from 'react';
import {
    MenuItem, Checkbox, ListItemText, IconButton, Button, MenuList, Popover, Box

} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import { renderButtonText } from '../../utils/utils';

const iconMap = {
    Employee: PersonIcon,
    Position: AssignmentIcon,
    Location: PlaceIcon,
    Role: SettingsOutlinedIcon,
    Status: ListOutlinedIcon,
    Event: EventNoteRoundedIcon,
};
const Filter = ({ anchorEl, setAnchorEl, filters, handleSelectFilter, filterName, filterOptions, optionIdKey }) => {

    const IconComponent = iconMap[filterName];
    const handleToggle = (filterOption) => handleSelectFilter(filterName, filterOption[optionIdKey]);
    const handleClear = () => {
        handleSelectFilter(filterName, 'clear');
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls={`${filterName}-menu`}
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    color: filters[filterName].length > 0 ? 'primary.main' : 'secondary.main',
                }}
            >
                <IconComponent />
                {renderButtonText(filters[filterName], filterName)}
            </IconButton>
            <Popover
                id={`${filterName}-menu`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1), 0px -3px 6px rgba(0, 0, 0, 0.1)",
                    padding: "0",
                    marginTop: "6px",
                    width: "auto",
                }}
            > <Box
                sx={{
                    display: "flex",
                    gap: 0,
                    padding: 0,
                    border: "1px solid #e0e0e0",
                    borderColor: "#101010",
                    borderRadius: "4px",
                    backgroundColor: '#15181b',
                }}
            >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0,
                            mt: 0.5,
                            mb: 0.5,
                        }}
                    >
                        <MenuList sx={{ maxHeight: 300, overflowY: 'auto' }}>
                            {filters[filterName].length > 0 && (
                                <MenuItem onClick={handleClear} sx={{ justifyContent: 'center', color: 'error.main' }}>
                                    <Button variant="text" color="error">
                                        Clear
                                    </Button>
                                </MenuItem>
                            )}
                            {filterOptions.map((filterOption) => (
                                <MenuItem key={filterOption[optionIdKey]} onClick={() => handleToggle(filterOption)}>
                                    <Checkbox checked={filters[filterName].includes(filterOption[optionIdKey])} />
                                    <ListItemText primary={filterOption.name} />
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default Filter;