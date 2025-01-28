import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeToggle, NavigationButton } from './Buttons';
import logo from '../../assets/logo.png'
import ScheduleToolbar from '../Schedule/Toolbars/ScheduleToolbar';
import EmployeeToolbar from '../Employees/Toolbars/EmployeeToolbar';
import { useSchedule } from '../../context/ScheduleContext';

const LogoContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { viewMode, setViewMode, setSelectedWeek, setSelectedMonth, setSelectedYear, setCurrentFilters, setRefetchTrigger } = useSchedule();

    const handleRoute = (path) => {
        navigate(path);
        setDrawerOpen(false);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const renderToolbar = () => {
        switch (location.pathname) {
            case '/schedule':
                return <ScheduleToolbar />;
            case '/employee':
                return <EmployeeToolbar />;
            default:
                return null;
        }
    };

    return (
        <>
            <AppBar
                position="sticky"
                boxShadow='0'
                elevation={0}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                        <LogoContainer>
                            <img src={logo} alt="Logo" style={{ width: '40px', height: '40px' }} />
                        </LogoContainer>
                        <NavigationButton />
                    </Box>
                    <Box sx={{ width: '100%' }}>  {renderToolbar()}</Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex', gap: '16px' } }}>
                        <ThemeToggle />
                        <Avatar
                            sx={{ marginLeft: 2 }}
                            src="/broken-image.jpg"
                        />
                    </Box>
                </Toolbar>
            </AppBar >
        </>
    );
};

export default Header;
