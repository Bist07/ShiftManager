const MuiButtonGroup = {
    styleOverrides: {
        root: ({ theme }) => ({
            backgroundColor: theme.palette.menu.bg,
            borderRadius: '16px',
            borderColor: theme.palette.field.border,
            '&:hover': {
                borderRadius: '16px',
                borderColor: theme.palette.menu.bgHover,
                color: theme.palette.primary.hover,
            },
        })
    }
}

export default MuiButtonGroup;