import { useTheme } from "@mui/material/styles";
import CreatableSelect from "react-select/creatable";

const CustomCreatableSelect = (props) => {
    const theme = useTheme();
    const styles = theme.components?.MuiCreatableSelect?.styleOverrides || {};

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            ...styles.control({ theme }),
        }),
        singleValue: (provided) => ({
            ...provided,
            ...styles.singleValue({ theme }),
        }),
        valueContainer: (provided) => ({
            ...provided,
            ...styles.valueContainer({ theme }),
        }),
        menu: (provided) => ({
            ...provided,
            ...styles.menu({ theme }),
        }),
        option: (provided, state) => ({
            ...provided,
            ...styles.option({ theme }, state),
        }),
        menuPortal: (provided) => ({
            ...provided,
            ...styles.menuPortal(provided),
        }),
        placeholder: (provided) => ({
            ...provided,
            ...styles.placeholder({ theme }),
        }),
        multiValue: (provided) => ({
            ...provided,
            ...styles.multiValue({ theme }),
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            ...styles.multiValueLabel({ theme }),
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            ...styles.multiValueRemove({ theme }),
        }),
        input: (provided) => ({
            ...provided,
            ...styles.input({ theme }),
        }),
    };

    return <CreatableSelect {...props} styles={customStyles} />;
};

export default CustomCreatableSelect;
