// theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Enables dark mode
        primary: {
            main: '#3399ff', // Light blue for primary color
        },
        secondary: {
            main: '#98a4b3', // Light grey for secondary color
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    borderRadius: '5px', // Custom border radius for all buttons
                    gap: '8px',
                    fontSize: '15px',
                    color: '#98a4b3',
                    border: '1px solid transparent', // Add border to mimic outlined style
                    '&:hover': {
                        backgroundColor: '#1a1e22',
                        borderColor: '#1d2126',
                    },
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    borderRadius: '5px', // Custom border radius for all buttons
                    color: '#98a4b3',
                    gap: '8px',
                    fontSize: '15px',
                    border: '1px solid transparent', // Add border to mimic outlined style
                    '&:hover': {
                        backgroundColor: '#1a1e22',
                        borderColor: '#1d2126',

                    },
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderBottom: '1px solid #1d2126',
                    position: 'sticky', // Stick to the top
                    top: 0,
                    zIndex: 1000,
                },
            },
        },
        MuiMenuList: {
            styleOverrides: {
                root: {
                    backgroundColor: '#15181b',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: '#15181b',
                    fontSize: '14px',
                    color: '#98a4b3',
                    "&:hover": {
                        backgroundColor: '#303840',
                    },

                    "&.Mui-selected": {
                        backgroundColor: "#2684ff",
                        color: "#fff",
                    },
                    "&.Mui-selected:hover": {
                        bgcolor: '#0077e5', borderColor: '#0077e5',
                    },
                },
            },
        },

    },
});

export default darkTheme;
