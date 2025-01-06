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
                <ArrowDropDownIcon sx={{ fontSize: '20px', color: '#bcbcbc' }} />
            </>
        );
    } else if (selectedCount > 1) {
        return (
            <>
                {`${category.toLowerCase()}s ${selectedCount}`}
                <ArrowDropDownIcon sx={{ fontSize: '20px', color: '#bcbcbc' }} />
            </>
        );
    } else {
        return `${category}s`;
    }
};
