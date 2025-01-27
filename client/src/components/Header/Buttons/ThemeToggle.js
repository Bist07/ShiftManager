import React from 'react';
import { useThemeMode } from '../../../context/themeContext';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Tooltip from '@mui/material/Tooltip';
const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useThemeMode();

    return (
        <Tooltip title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
            <IconButton onClick={toggleTheme} color="primary" aria-label="toggle theme">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;
