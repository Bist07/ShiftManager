import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
    ListItemButton,
    Box,
    Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { renderButtonText } from '../../../utils/utils';

const iconMap = {
    Employee: PersonIcon,
    Position: AssignmentIcon,
    Location: PlaceIcon,
    Role: SettingsOutlinedIcon,
    Status: ListOutlinedIcon,
    Event: EventNoteRoundedIcon,
};

const Filter = ({ filters, handleSelectFilter, filterName, filterOptions, optionIdKey }) => {
    const [open, setOpen] = useState(false);
    const IconComponent = iconMap[filterName];

    const handleToggle = (filterOption) => handleSelectFilter(filterName, filterOption[optionIdKey]);
    const handleClear = () => handleSelectFilter(filterName, 'clear');

    return (
        <List sx={{ width: "100%" }}>
            {/* Parent List Item */}
            <ListItem key={filterName} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    onClick={() => setOpen(!open)}
                >
                    <ListItemIcon
                        sx={[
                            {
                                mr: 1.5,
                                minWidth: 0,
                                justifyContent: 'center',

                            },
                            filters[filterName].length > 0 ?
                                {
                                    color: 'primary.main'
                                }
                                : {
                                    color: 'inherit'
                                }
                        ]}
                    >
                        <IconComponent />
                    </ListItemIcon>
                    <ListItemText
                        primary={renderButtonText(filters[filterName], filterName)}
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

            </ListItem>

            {/* Nested List for Filter Options */}
            <Collapse in={open} timeout="auto" unmountOnExit>
                {/* Clear Button */}
                {filters[filterName].length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <Button variant="text" color="error" onClick={handleClear}>
                            Clear
                        </Button>
                    </Box>
                )}

                {/* List of Filter Options */}
                <List component="div" disablePadding>
                    {filterOptions.map((filterOption) => (
                        <ListItem
                            key={filterOption[optionIdKey]}
                            button
                            onClick={() => handleToggle(filterOption)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={filters[filterName].includes(filterOption[optionIdKey])}
                                />
                            </ListItemIcon>
                            <ListItemText primary={filterOption.name} />
                        </ListItem>
                    ))}
                </List>

            </Collapse>
        </List>
    );
};

export default Filter;
