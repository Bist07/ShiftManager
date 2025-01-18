import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Tab,
    Tabs,
    Grid,
    Paper,
} from '@mui/material';
import AvailabilityForm from '../components/Employees/AvailabilityForm';
import PreferencesForm from '../components/Employees/PreferencesForm';

const Employee = () => {
    const [tabValue, setTabValue] = useState(0);
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        position: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Optionally fetch employee data if editing an existing employee
    }, []);

    const handleTabChange = (event, newValue) => setTabValue(newValue);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (isEditing) {
            // Update the employee in the backend
            console.log('Updating employee:', employee);
        } else {
            // Create a new employee in the backend
            console.log('Creating employee:', employee);
        }
    };

    const handleCancel = () => {
        // Reset the form
        setEmployee({
            name: '',
            email: '',
            position: '',
        });
        setIsEditing(false);
    };

    return (
        <Box p={3}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    {isEditing ? 'Edit Employee' : 'Add New Employee'}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={employee.name}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={employee.email}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Position"
                            name="position"
                            value={employee.position}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ mr: 2 }}
                    >
                        {isEditing ? 'Save Changes' : 'Add Employee'}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Box>
            </Paper>

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                sx={{ mb: 2 }}
            >
                <Tab label="Preferences" />
                <Tab label="Availability" />
            </Tabs>

            <Box>
                {tabValue === 0 && (
                    <PreferencesForm
                        preferences={employee.preferences || {}}
                        onUpdatePreferences={(updatedPreferences) =>
                            setEmployee((prev) => ({
                                ...prev,
                                preferences: updatedPreferences,
                            }))
                        }
                    />
                )}
                {tabValue === 1 && (
                    <AvailabilityForm
                        availability={employee.availability || {}}
                        onUpdateAvailability={(updatedAvailability) =>
                            setEmployee((prev) => ({
                                ...prev,
                                availability: updatedAvailability,
                            }))
                        }
                    />
                )}
            </Box>
        </Box>
    );
};

export default Employee;
