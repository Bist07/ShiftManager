const MuiListItemButton = {
    styleOverrides: {
        root: ({ theme }) => ({
            fontWeight: 600,
            fontSize: '15px',
            borderRadius: '4px',
            color: theme.palette.secondary.main,
            gap: '8px',
            border: '1px solid transparent',
            '&:hover': {
                backgroundColor: theme.palette.background.hover,
                borderColor: theme.palette.border.hover,
                color: theme.palette.secondary.hover,
            },
        }),
    },
};

export default MuiListItemButton;
