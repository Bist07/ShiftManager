// theme.js
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Enables dark mode
        primary: {
            main: '#3399ff', // Light blue for primary color
            green: '#00af28',
        },
        secondary: {
            main: '#b6bec9', // Light grey for secondary color
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#121212",
                },
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    borderRadius: '5px', // Custom border radius for all buttons
                    gap: '8px',
                    fontSize: '15px',
                    color: '#b6bec9',
                    border: '1px solid transparent', // Add border to mimic outlined style
                    '&:hover': {
                        backgroundColor: '#1a1e22',
                        borderColor: '#1d2126',
                        color: '#ebf5ff',
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
                    color: '#b6bec9',
                    gap: '8px',
                    fontSize: '15px',
                    border: '1px solid transparent', // Add border to mimic outlined style
                    '&:hover': {
                        backgroundColor: '#1a1e22',
                        borderColor: '#1d2126',
                        color: '#ebf5ff',
                    },
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between',
                    padding: '12px',
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
                    color: '#b6bec9',
                    "&:hover": {
                        backgroundColor: '#303840',
                        color: '#ebf5ff',
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
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    maxHeight: '800px', // Set a maxHeight for scrolling
                    overflow: 'auto', // Enable scrolling
                    borderRadius: '40px'
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor: '#14171a',
                    border: '0',
                    padding: '0',
                    minWidth: '185px',
                }
            },
            variants: [
                {
                    props: { variant: 'header' },
                    style: {
                        borderBottom: '1px solid #ccc',

                    }
                },
                {
                    props: { variant: 'body' },
                    style: {
                        border: '1px solid #1d2126',
                        borderBottom: '0',
                        verticalAlign: "top"
                    },
                }
            ]
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'header' },
                    style: {
                        fontWeight: 600,
                        padding: '20px'
                    }
                },
                {
                    props: { variant: 'Table.header.secondary' },
                    style: {
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        lineHeight: '32px',
                        letterSpacing: '.8px'
                    }
                },
                {
                    props: { variant: 'Table.header.primary' },
                    style: {
                        fontSize: '26px',
                        lineHeight: '46px',
                        fontWeight: 400
                    }
                }
            ]
        }


    },
});

export default darkTheme;

export const lightTheme = createTheme({
    palette: {
        mode: 'light', // Enables light mode
        primary: {
            main: '#0066cc', // A deeper blue for primary color
            green: '#008000', // Bright green for accents
        },
        secondary: {
            main: '#5a5a5a', // Neutral grey for secondary color
        },
        background: {
            default: '#f5f5f5', // Light grey background for light mode
            paper: '#ffffff', // White background for paper components
        },
        text: {
            primary: '#212121', // Dark grey text for readability
            secondary: '#757575', // Lighter grey for secondary text
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#ffffff", // White AppBar for light theme
                    color: '#212121', // Dark text color
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    borderRadius: '5px',
                    gap: '8px',
                    fontSize: '15px',
                    color: '#5a5a5a', // Neutral grey for icons
                    border: '1px solid transparent',
                    '&:hover': {
                        backgroundColor: '#e0e0e0', // Light grey hover color
                        borderColor: '#d6d6d6',
                        color: '#0066cc', // Primary blue hover text color
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    borderRadius: '5px',
                    color: '#5a5a5a',
                    gap: '8px',
                    fontSize: '15px',
                    border: '1px solid transparent',
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                        borderColor: '#d6d6d6',
                        color: '#0066cc',
                    },
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between',
                    padding: '12px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: '#ffffff', // White background for Toolbar
                },
            },
        },
        MuiMenuList: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff', // White MenuList background
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff', // White MenuItem background
                    fontSize: '14px',
                    color: '#212121', // Dark text
                    "&:hover": {
                        backgroundColor: '#e8eaf6', // Light blue-grey hover color
                        color: '#0066cc',
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#0066cc",
                        color: "#ffffff",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#004ba0",
                    },
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    maxHeight: '800px',
                    overflow: 'auto',
                    borderRadius: '40px',
                    backgroundColor: '#ffffff', // White table container
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    border: '0',
                    padding: '0',
                    minWidth: '185px',
                },
            },
            variants: [
                {
                    props: { variant: 'header' },
                    style: {
                        borderBottom: '1px solid #ccc', // Light grey header border
                    },
                },
                {
                    props: { variant: 'body' },
                    style: {
                        border: '1px solid #e0e0e0', // Light grey body border
                        borderBottom: '0',
                        verticalAlign: "top",
                    },
                },
            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'header' },
                    style: {
                        fontWeight: 600,
                        padding: '20px',
                        color: '#212121', // Dark text for headers
                    },
                },
                {
                    props: { variant: 'Table.header.secondary' },
                    style: {
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        lineHeight: '32px',
                        letterSpacing: '.8px',
                        color: '#757575', // Secondary grey for sub-headers
                    },
                },
                {
                    props: { variant: 'Table.header.primary' },
                    style: {
                        fontSize: '26px',
                        lineHeight: '46px',
                        fontWeight: 400,
                        color: '#212121',
                    },
                },
            ],
        },
    },
});
