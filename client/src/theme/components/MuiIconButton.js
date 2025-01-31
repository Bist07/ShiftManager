const MuiIconButton = {
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
    variants: [
        {
            props: { variant: 'add' },
            style: ({ theme }) => ({
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                '&:hover': { color: 'white', backgroundColor: theme.palette.primary.hover, borderColor: theme.palette.primary.hover },
            }),
        },
    ],
};

export default MuiIconButton;
