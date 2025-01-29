import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const isInvalid = (value) =>
    value === "N/A" ||
    !value ||
    (Array.isArray(value) && value.length === 0);

export const renderButtonText = (filters, category) => {
    const selectedCount = Object.keys(filters).length;
    if (selectedCount === 1) {
        return (
            <>
                {`${category.toLowerCase()} ${selectedCount}`}
            </>
        );
    } else if (selectedCount > 1) {
        return (
            <>
                {`${category.toLowerCase()}s ${selectedCount}`}
            </>
        );
    } else {
        return `${category}s`;
    }
};
