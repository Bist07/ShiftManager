import React, { useState } from 'react';
import { Button, MenuList, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuWrapper from '../../Common/MenuWrapper';

const NavigationButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();


    const routes = [
        { path: '/schedule', name: 'Schedule' },
        { path: '/employee', name: 'Employee' },
    ];


    const currentRoute = routes.find((route) => route.path === location.pathname)?.name || 'Navigate';

    const handleOpen = (event) => {
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
            <MenuWrapper anchorEl={anchorEl} setAnchorEl={setAnchorEl} >
                <MenuList
                    sx={{
                        maxHeight: 300,
                        overflowY: "auto",
                        padding: "0",
                        flex: 1,
                    }}
                >
                    {routes.map((route) => (
                        <MenuItem key={route.path} onClick={() => handleRoute(route.path)}>
                            {route.name}
                        </MenuItem>
                    ))}
                </MenuList>
            </MenuWrapper>
        </div >
    );
};

export default NavigationButton;
