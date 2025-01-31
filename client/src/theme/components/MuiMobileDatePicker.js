import TextField from '@mui/material/TextField';

const MuiMobileDatePicker = {
    defaultProps: {
        slots: {
            textField: (props) => <TextField {...props} sx={{
                borderRadius: '4px',
                backgroundColor: (theme) => theme.palette.menu.bg,
                '& input': {
                    fontSize: '14px',
                    color: (theme) => theme.palette.secondary.main,
                    '&:hover': {
                        color: (theme) => theme.palette.secondary.hover,
                    }
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: (theme) => theme.palette.field.border,
                        borderRadius: '4px',
                    },
                    '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.menu.bgHover
                    },
                    '&.Mui-disabled': {
                        backgroundColor: (theme) => theme.palette.menu.bg,
                        '& input': {
                            fontSize: '14px',
                        },
                        '& fieldset': {
                            borderColor: (theme) => theme.palette.field.border,
                            borderRadius: '4px',
                        },
                    },

                },
                '& .MuiInputAdornment-root .MuiTypography-root': {
                    fontSize: '12px',
                    color: '#5f7183',
                },
                '& .MuiInputBase-input': {
                    fontSize: '14px',
                    color: (theme) => theme.palette.secondary.main,
                },
                '& svg': {
                    color: (theme) => theme.palette.primary.main,
                },
            }} />
        },
    },
};

export default MuiMobileDatePicker;
