
export const MuiCreatableSelect = {
    styleOverrides: {
        control: ({ theme }) => ({
            fontSize: '14px',
            backgroundColor: theme.palette.menu.bg,
            borderColor: theme.palette.field.border,
            '&:hover': {
                borderColor: theme.palette.menu.bgHover,
                color: theme.palette.secondary.hover,
            },
        }),
        singleValue: ({ theme }) => ({
            color: theme.palette.secondary.main,
        }),
        valueContainer: ({ theme }) => ({
            '&:hover': {
                '& > div': {
                    color: theme.palette.secondary.hover,
                },
            },
        }),
        menu: ({ theme }) => ({
            backgroundColor: theme.palette.menu.bg,
            fontSize: '14px',
            border: '1px solid' + theme.palette.border.hover
        }),
        option: ({ theme }, state) => ({
            backgroundColor: state.isSelected
                ? theme.palette.primary.main
                : state.isFocused
                    ? theme.palette.menu.bgHover
                    : theme.palette.menu.bg,
            color: state.isSelected ? theme.palette.menu.selected : theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: state.isSelected ? theme.palette.primary.hover : theme.palette.menu.bgHover,
                color: theme.palette.secondary.hover,
            },
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 1300,
        }),
        placeholder: ({ theme }) => ({
            color: theme.palette.field.placeholder,
        }),
        multiValue: ({ theme }) => ({
            backgroundColor: theme.palette.menu.bgHover,
            color: theme.palette.secondary.hover,
        }),
        multiValueLabel: ({ theme }) => ({
            color: theme.palette.secondary.main,
        }),
        multiValueRemove: ({ theme }) => ({
            color: theme.palette.secondary.main,
            ':hover': {
                backgroundColor: '#ff5733',
                color: '#ffffff',
            },
        }),
        input: ({ theme }) => ({
            color: theme.palette.secondary.main,
        }),
    }
};

export default MuiCreatableSelect;