import React from 'react';
import PropTypes from 'prop-types';
import { DialogContent, Divider, Collapse, Typography } from '@mui/material';
import { RepeatOptions, ShiftTimePicker, DialogRow } from '../Dialogs/DialogFields';
import { Selector, DatePicker } from '../../Common'
import { useLocations, useEmployee, usePositions } from '../../../hooks';

const DialogContentRenderer = ({ formData, handleFormChange, repeat, error, fieldList }) => {
    const { locations = [] } = useLocations();
    const { employees = [] } = useEmployee();
    const { positions = [] } = usePositions();


    // Define the field data configuration
    const fieldData = [
        { name: 'Location', data: locations, optionIdKey: 'location_id', placeHolder: "Add location", isMulti: false },
        { name: 'Position', data: positions, optionIdKey: 'position_id', placeHolder: "Add position", isMulti: false },
        { name: 'Employee', data: employees, optionIdKey: 'e_id', placeHolder: "Add employee(s)", isMulti: true },
        { name: 'Date' },
        { name: 'Time' },
        { name: 'Repeat' },
    ];

    // Filter and sort field data based on the provided fieldList
    const filterNamesFromData = (filterData, fieldList) => {
        const filteredData = filterData.filter(item => fieldList?.includes(item.name));
        return filteredData.sort((a, b) => fieldList.indexOf(a.name) - fieldList.indexOf(b.name));
    };

    const filteredData = filterNamesFromData(fieldData, fieldList);

    // Render the correct field based on the name
    const renderField = ({ name, data, optionIdKey, placeHolder, isMulti }) => {
        switch (name) {
            case 'Date':
                return (
                    <DatePicker
                        formData={formData.date}
                        handleChange={handleFormChange}
                    />
                );
            case 'Time':
                return (
                    <ShiftTimePicker
                        formData={formData}
                        handleChange={handleFormChange}
                    />
                );
            default:
                return (
                    <Selector
                        key={name}
                        name={name}
                        formData={formData[optionIdKey]}
                        handleChange={handleFormChange}
                        options={data}
                        optionIdKey={optionIdKey}
                        placeHolderText={placeHolder}
                        isMulti={isMulti}
                    />
                );
        }
    };

    return (
        <DialogContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
            {filteredData.map((field) => {
                if (field.name === 'Repeat') {
                    return (
                        <React.Fragment key={field.name}>
                            {!repeat && (
                                <Divider sx={{ ml: 23.25, mr: 3, mt: 2, mb: 1 }} />
                            )}
                            <Collapse in={repeat}>
                                {repeat && (
                                    <RepeatOptions
                                        formData={formData.repeat}
                                        handleChange={handleFormChange}
                                    />
                                )}
                            </Collapse>
                        </React.Fragment>
                    );
                }

                return (
                    <DialogRow
                        key={field.name}
                        iconName={field.name}
                        field={renderField(field)}
                    />
                );
            })}
            {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
    );


};


DialogContentRenderer.propTypes = {
    formData: PropTypes.object.isRequired,
    handleFormChange: PropTypes.func.isRequired,
    repeat: PropTypes.bool,
    error: PropTypes.string,
    fieldList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DialogContentRenderer.defaultProps = {
    repeat: false,
    error: null,
};

export default DialogContentRenderer;