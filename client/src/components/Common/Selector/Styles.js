
export const CreatableSelectStyle = {

    control: (provided) => ({
        ...provided,
        fontSize: '14px',
        backgroundColor: '#15181b',
        borderColor: '#20242a',
        '&:hover': {
            borderColor: '#303840',
            color: '#ebf5ff',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#b6bec9',
    }),
    valueContainer: (provided) => ({
        ...provided,
        '&:hover': {
            '& > div': {
                color: '#ebf5ff', // Hover color for the selected value
            },
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#15181b',
        fontSize: '14px',
        border: '1px solid #1d2126'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#3399ff'
            : state.isFocused
                ? '#303840'
                : '#15181b',
        color: state.isSelected ? 'white' : '#b6bec9',
        '&:hover': {
            backgroundColor: state.isSelected ? '#0077e5' : '#303840',
            color: '#ebf5ff',
        },
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 1300,
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#5f7183',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#303840', // Background color of selected values
        color: '#b6bec9',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#b6bec9',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#b6bec9',
        ':hover': {
            backgroundColor: '#ff5733', // Hover background for the remove button
            color: '#ffffff', // Hover text color
        },
    }),
    input: (provided) => ({
        ...provided,
        color: '#b6bec9', // Change the color of the typed text
    }),

};

