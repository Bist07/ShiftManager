import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import useEmployee from '../../hooks/useEmployee';
import { getEmployeeNameFromId } from '../../utils/employeeUtils';

const ConflictDialog = ({ open, conflictDetails, onIgnore, onEdit, onClose }) => {
    const { employees = [], loading } = useEmployee();
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Shift Availability Conflict</DialogTitle>
            <DialogContent>
                <p>
                    There is a conflict with the shift timing! The shift you are trying to schedule
                    does not fit within the available time slots for the selected employee(s).
                </p>
                <strong>Conflicting Availability:</strong>
                {Object.entries(conflictDetails).map(([e_id, conflicts], index) => (
                    <div key={index}>
                        <h4>{getEmployeeNameFromId(e_id, employees)}</h4> {/* Using e_id from the entries */}
                        <ul>
                            {conflicts.map((detail, idx) => (
                                <li key={idx}>
                                    {detail.day}: {detail.start_time} - {detail.end_time}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onEdit} color="primary">Go Back and Edit</Button>
                <Button onClick={onIgnore} color="secondary">Ignore and Proceed</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConflictDialog;
