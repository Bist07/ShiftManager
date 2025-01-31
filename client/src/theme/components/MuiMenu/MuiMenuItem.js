const MuiMenuItem = {
    styleOverrides: {
        root: ({ theme }) => ({
            backgroundColor: theme.palette.menu.bg,
            fontSize: '14px',
            color: theme.palette.secondary.main,
            "&:hover": {
                backgroundColor: theme.palette.menu.bgHover,
                color: theme.palette.secondary.hover,
            },
            "&.Mui-selected": {
                backgroundColor: theme.palette.menu.bgSelected,
                color: theme.palette.menu.selected
            },
            "&.Mui-selected:hover": {
                backgroundColor: theme.palette.primary.hover,
                borderColor: theme.palette.primary.hover,
            },
        }),
    },
};

export default MuiMenuItem;
