import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DialogContent, Divider, Collapse, Typography } from '@mui/material';
import { DatePicker, RepeatOptions, Selector, ShiftTimePicker } from '../../DialogFields';
import { useLocations, useEmployee, usePositions } from '../../../hooks';
const DialogContentRenderer = ({ formData, handleFormChange, repeat, error, fieldList }) => {
    const { locations = [] } = useLocations();
    const { employees = [] } = useEmployee();
    const { positions = [] } = usePositions();

    const filterData = [
        { name: 'Location', data: locations, optionIdKey: 'location_id', placeHolder: "Add location", isMulti: false },
        { name: 'Position', data: positions, optionIdKey: 'position_id', placeHolder: "Add position", isMulti: false },
        { name: 'Employee', data: employees, optionIdKey: 'e_id', placeHolder: "Add employee(s)", isMulti: true },
    ];

    function filterNamesFromData(filterData, fieldList) {
        const filteredData = filterData.filter(item => fieldList?.includes(item.name));

        return filteredData.sort((a, b) => fieldList.indexOf(a.name) - fieldList.indexOf(b.name));
    }

    const filteredData = filterNamesFromData(filterData, fieldList);

    return (
        <DialogContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
            {fieldList.includes("Date") && (
                <DatePicker formData={formData} handleChange={handleFormChange} />
            )}
            {fieldList.includes("Time") && (
                <ShiftTimePicker formData={formData} handleChange={handleFormChange} />
            )}
            {fieldList.includes("RepeatOptions") && (
                <>
                    {!repeat && (
                        <Divider sx={{ ml: 23.25, mr: 3, mt: 2, mb: 1 }} />
                    )}
                    <Collapse in={repeat}>
                        <RepeatOptions formData={formData.repeat} handleChange={handleFormChange} />
                    </Collapse>
                </>
            )}
            {filteredData.map(({ name, data, optionIdKey, placeHolder, isMulti }) => (
                <Selector
                    key={name}
                    name={name}
                    formData={formData}
                    handleChange={handleFormChange}
                    options={data}
                    optionIdKey={optionIdKey}
                    placeHolderText={placeHolder}
                    isMulti={isMulti}
                />
            ))}

            {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
    );
};

DialogContentRenderer.propTypes = {
    formData: PropTypes.object.isRequired,
    handleFormChange: PropTypes.func.isRequired,
    repeat: PropTypes.bool,
    error: PropTypes.string,
};

DialogContentRenderer.defaultProps = {
    repeat: false,
    error: null,
};

export default DialogContentRenderer;
