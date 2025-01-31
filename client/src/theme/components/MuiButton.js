const MuiButton = {
    styleOverrides: {
        root: ({ theme }) => ({
            fontWeight: 600,
            fontSize: '15px',
            borderRadius: '5px',
            gap: '8px',
            border: '1px solid transparent',
            color: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: theme.palette.background.hover,
                borderColor: theme.palette.border.hover,
                color: theme.palette.secondary.hover,
            },
        }),

    },
};

export default MuiButton;

