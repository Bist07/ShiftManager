import React, { useState, useEffect } from 'react';
import CustomCreatableSelect from './CustomCreatableSelect';

const Selector = ({ name, formData, handleChange, loading, optionIdKey, options, placeHolderText, isMulti }) => {
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        if (formData && options?.length > 0) {

            if (isMulti) {
                const initialOptions = formData.map((id) => {
                    const option = options.find((opt) => opt[optionIdKey] === id);
                    return {
                        value: id,
                        label: option ? `${option.name}` : id,
                    };
                });
                setSelectedOption(initialOptions);
            }
            else {
                const option = options.find((opt) => opt[optionIdKey] === formData);
                const initialOption = {
                    value: formData,
                    label: option ? `${option.name}` : formData,
                };
                setSelectedOption(initialOption);
            }
        }
    }, [formData[optionIdKey], options]);

    const handleSelectionChange = (selectedOption) => {
        setSelectedOption(selectedOption || null);
        if (isMulti) {
            const selectedIds = selectedOption ? selectedOption.map((opt) => opt.value) : [];
            handleChange(optionIdKey, selectedIds);
        } else {
            const selectedId = selectedOption ? selectedOption.value : '';
            handleChange(optionIdKey, selectedId);
        }
    };

    const formatedOptions = options?.map((option) => ({
        value: option[optionIdKey],
        label: `${option.name}`,
    }));

    return (
        <div>
            <CustomCreatableSelect
                isMulti={isMulti}
                isClearable
                isLoading={loading}
                options={formatedOptions}
                value={selectedOption}
                onChange={handleSelectionChange}
                placeholder={placeHolderText}
                menuPortalTarget={document.body}
            />
        </div >
    );
};

export default Selector;
