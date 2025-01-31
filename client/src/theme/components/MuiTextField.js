const MuiTextField = {
    styleOverrides: {
        root: ({ theme, ownerState }) => {
            const { errors, type } = ownerState || {};  // Safely access ownerState

            return {
                borderRadius: '4px',
                backgroundColor: theme.palette.menu.bg,
                '& input': {
                    borderRadius: '4px',
                    fontSize: '14px',
                    color: theme.palette.secondary.main,
                    '&:hover': {
                        color: theme.palette.secondary.hover,
                    },
                },
                '& .MuiInputAdornment-root': {
                    '& .MuiTypography-root': {
                        fontSize: '12px',
                        color: theme.palette.field.placeholder,
                    },
                },
                '& .MuiInputAdornment-positionEnd': {
                    mr: -2,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme.palette.field.border,
                    },
                    '&:hover fieldset': {
                        borderColor: errors && errors[type]
                            ? theme.palette.error.main
                            : theme.palette.menu.bgHover,
                    },
                    '&.Mui-disabled': {
                        backgroundColor: theme.palette.menu.bg,
                        '& input': {
                            fontSize: '14px',
                        },
                        '& fieldset': {
                            borderColor: theme.palette.field.border,
                            borderRadius: '4px',
                        },
                    },
                },
            };
        },
    },
};

export default MuiTextField;
