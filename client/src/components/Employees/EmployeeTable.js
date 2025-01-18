import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmployeeCard from '../EmployeeCard';
import { useEmployee, useLocations, useRoles } from '../../hooks';
import EmployeeDialog from './EmployeeDialog';

const EmployeeTable = ({ filter, refetchTrigger }) => {
    const { employees = [], loading } = useEmployee(); // Ensure employees is always an array
    const { locations } = useLocations();
    const { roles } = useRoles();
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const [openDialog, setOpenDialog] = useState(false); // State to open/close the dialog

    const getRoleName = (role_id) => roles?.find((role) => role.id === role_id)?.name || 'Unknown';
    const getLocationName = (location_id) =>
        locations?.find((loc) => loc.id === location_id)?.name || 'Unknown';

    const handleDialogClose = () => {
        setOpenDialog(false); // Close the dialog
    };

    const handleDialogOpen = (emp) => {
        setCurrentEmployee(emp); // Pass the whole employee object
        setOpenDialog(true); // Open the dialog
    };

    useEffect(() => {
        // Prevent unnecessary state updates for the employee data to avoid infinite loop
        if (!currentEmployee) return;
    }, [currentEmployee]);

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: '700px', // Set a maxHeight for scrolling
                    overflow: 'auto', // Enable scrolling
                }}
            >
                <Table stickyHeader sx={{ minWidth: 800, tableLayout: 'fixed' }} aria-label="employee shift table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '15%', padding: 1, paddingLeft: 10.5 }}>  <strong>NAME </strong></TableCell>
                            <TableCell sx={{ width: '12%', padding: 0 }}>  <strong>EMPLOYEE ID</strong></TableCell>
                            <TableCell sx={{ width: '12%', padding: 1 }}>  <strong>POSITION</strong></TableCell>
                            <TableCell sx={{ width: '12%', padding: 1 }}>  <strong>LOCATION</strong></TableCell>
                            <TableCell sx={{ width: '12%', padding: 1 }}>  <strong>EMAIL</strong></TableCell>
                            <TableCell sx={{ width: '12%', padding: 1 }}>  <strong>PHONE</strong></TableCell>
                            <TableCell sx={{ width: '12%', padding: 1 }}>  <strong>STATUS</strong></TableCell>
                            <TableCell sx={{ width: '8%', padding: 0 }}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow
                                key={emp.e_id}
                                hover
                            >
                                <TableCell sx={{ width: '15%', padding: 1 }}>
                                    <EmployeeCard
                                        title={emp.name}
                                        description="Employee"
                                    />
                                </TableCell>
                                <TableCell sx={{ width: '12%', padding: 0 }}>{emp.e_id}</TableCell>
                                <TableCell sx={{ width: '12%', padding: 1 }}>{getRoleName(emp.role_id)}</TableCell>
                                <TableCell sx={{ width: '12%', padding: 1 }}>{getLocationName(emp.location_id)}</TableCell>
                                <TableCell sx={{ width: '12%', padding: 1 }}>{emp.email || 'N/A'}</TableCell>
                                <TableCell sx={{ width: '12%', padding: 1 }}>{emp.phone || 'N/A'}</TableCell>
                                <TableCell sx={{ width: '12%', padding: 1 }}>{emp.status || 'Active'}</TableCell>
                                <TableCell sx={{ width: '8%', padding: 0 }}>
                                    <IconButton
                                        onClick={() => handleDialogOpen(emp)} // Pass the entire employee object
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Employee Dialog */}
            {currentEmployee && (
                <EmployeeDialog
                    e_id={currentEmployee.e_id}
                    firstName={currentEmployee.name}
                    lastName={currentEmployee.lastName}
                    location_id={currentEmployee.location_id}
                    role_id={currentEmployee.role_id}
                    email={currentEmployee.email}
                    phone={currentEmployee.phone}
                    status={currentEmployee.status}
                    open={openDialog}
                    onSave={(updatedEmployee) => {
                        // Handle save action
                    }}
                    onClose={handleDialogClose}
                    onDelete={() => {
                        // Handle delete action
                    }}
                />
            )}
        </>
    );
};

export default EmployeeTable;
