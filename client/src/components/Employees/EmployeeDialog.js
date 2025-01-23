import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Tab,
    Tabs,
    Box,
    TextField,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import EmployeeCard from '../EmployeeCard';
import { deleteShiftsAndAssignments } from '../../services/api';
import { isInvalid } from '../../utils';
import { LocationSelector, PositionSelector } from '../DialogFields';

const EmployeeDialog = ({
    e_id,
    firstName,
    lastName,
    location_id,
    position_id,
    email,
    phone,
    status,
    preferences = {},
    availability = [],
    onSave,
    onClose,
    onDelete,
    open,
    positions = [],
    locations = []
}) => {
    const [error, setError] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
        status: status || '',
        position_id: position_id || '',
        location_id: location_id || '',
        preferences: { ...preferences },
        availability: [...availability],
    });

    useEffect(() => {
        if (open) {
            setFormData({
                firstName: firstName || '',
                lastName: lastName || '',
                email: email || '',
                phone: phone || '',
                status: status || '',
                position_id: position_id || '',
                location_id: location_id || '',
                preferences: { ...preferences },
                availability: [...availability],
            });
            setError(''); // Reset the error message when the dialog is opened
        }
    }, [open]);

    const handleFormChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updatedAvailability = [...formData.availability];
        updatedAvailability[index] = { ...updatedAvailability[index], [field]: value };
        setFormData((prev) => ({
            ...prev,
            availability: updatedAvailability,
        }));
    };

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const handleSave = async () => {
        if (
            isInvalid(formData.firstName) ||
            isInvalid(formData.lastName) ||
            isInvalid(formData.email) ||
            isInvalid(formData.phone) ||
            isInvalid(formData.status)
        ) {
            setError('Please fill out all required fields.');
            return;
        }

        try {
            // Save logic here
            onSave(formData);
            setError(''); // Reset the error after successful save
        } catch (err) {
            setError('Failed to save changes. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteShiftsAndAssignments(e_id);
            onDelete();
            onClose();
        } catch (err) {
            setError('Failed to delete the employee. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{e_id ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <Box mb={2}>
                    <EmployeeCard
                        title={`${formData.firstName} ${formData.lastName}`}
                        description="Employee Overview"
                    />
                </Box>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="employee-dialog-tabs">
                    <Tab label="Employee Details" />
                    <Tab label="Preferences" />
                    <Tab label="Availability" />
                </Tabs>

                {/* Employee Details Tab */}
                {tabIndex === 0 && (
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    value={formData.firstName}
                                    onChange={(e) => handleFormChange('firstName', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => handleFormChange('lastName', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={formData.email}
                                    onChange={(e) => handleFormChange('email', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    value={formData.phone}
                                    onChange={(e) => handleFormChange('phone', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Status"
                                    value={formData.status}
                                    onChange={(e) => handleFormChange('status', e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Preferences Tab */}
                {tabIndex === 1 && (
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {/* <PositionSelector formData={formData.preferences.position_id || ''} handleChange={(e) => handleFormChange('preferences.position_id', e.target.value)}></PositionSelector> */}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <LocationSelector formData={formData.preferences.location_id || ''} handleChange={(e) => handleFormChange('preferences.location_id', e.target.value)}></LocationSelector> */}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Max Weekly Hours"
                                    type="number"
                                    value={formData.preferences.MaxWeeklyHours || ''}
                                    onChange={(e) => handleFormChange('preferences.MaxWeeklyHours', e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Availability Tab */}
                {tabIndex === 2 && (
                    <Box mt={2}>
                        {formData.availability.map((item, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Day of Week"
                                        type="number"
                                        value={item.day_of_week || ''}
                                        onChange={(e) => handleAvailabilityChange(index, 'day_of_week', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Start Time"
                                        type="time"
                                        value={item.start_time || ''}
                                        onChange={(e) => handleAvailabilityChange(index, 'start_time', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="End Time"
                                        type="time"
                                        value={item.end_time || ''}
                                        onChange={(e) => handleAvailabilityChange(index, 'end_time', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                {e_id && (
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                )}
                <Button
                    onClick={handleSave}
                    disabled={
                        isInvalid(formData.firstName) ||
                        isInvalid(formData.email) ||
                        isInvalid(formData.phone) ||
                        isInvalid(formData.status)
                    }
                >
                    {e_id ? 'Update' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeDialog;
