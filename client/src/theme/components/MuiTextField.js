const MuiTextField = {
    styleOverrides: {
        root: ({ theme, ownerState }) => {
            const { error = false, errors = [], type = 'default' } = ownerState || {};
            return {
                width: type === "break_duration"
                    ? errors[type]
                        ? "45%"
                        : Object.keys(errors).some(key => key !== type && errors[key])
                            ? "25%"
                            : "32.5%"
                    : type === "start_time" || type === "end_time"
                        ? errors[type]
                            ? "50%"
                            : Object.keys(errors).some(key => key !== type && errors[key])
                                ? "25%"
                                : "40%"
                        : "100%",
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
                        borderColor: error
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
