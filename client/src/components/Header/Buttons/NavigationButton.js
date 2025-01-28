import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Map routes to display names
    const routes = [
        { path: '/schedule', name: 'Schedule' },
        { path: '/employee', name: 'Employee' },
    ];

    // Find the current route name
    const currentRoute = routes.find((route) => route.path === location.pathname)?.name || 'Navigate';

    const handleOpen = (event) => {
        // Open the menu only if it's not already open
        if (!anchorEl) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRoute = (route) => {
        navigate(route);
        handleClose();
    };

    return (
        <div
        >
            <Button
                onClick={handleOpen}
            >
                {currentRoute}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    onMouseEnter: handleOpen,
                }}
            >
                {routes.map((route) => (
                    <MenuItem key={route.path} onClick={() => handleRoute(route.path)}>
                        {route.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default NavigationButton;
