import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useEmployee } from '../../../hooks';
import { getEmployeeNameFromId, formatDate, formatTime } from '../../../utils';
import dayjs from 'dayjs';

const ConflictDialog = ({ open, conflictDetails, ScheduleConflicts, onIgnore, onEdit, onClose }) => {
    const { employees = [], loading } = useEmployee();

    // Merge and group conflicts by e_id
    const groupedConflicts = {};
    [conflictDetails, ScheduleConflicts].forEach((conflictType) => {
        Object.entries(conflictType).forEach(([e_id, conflicts]) => {
            if (!groupedConflicts[e_id]) {
                groupedConflicts[e_id] = [];
            }
            groupedConflicts[e_id].push(...conflicts);
        });
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Shift Availability Conflict</DialogTitle>
            <DialogContent>
                <p>
                    There is a conflict with the shift timing! The shift you are trying to schedule
                    does not fit within the available time slots for the selected employee(s).
                </p>
                <strong>Conflicting Availability and Schedules:</strong>
                {Object.entries(groupedConflicts).map(([e_id, conflicts], index) => (
                    <div key={index}>
                        <h4>{getEmployeeNameFromId(e_id, employees)}</h4>
                        <ul>
                            {conflicts.map((detail, idx) => (
                                <li key={idx}>
                                    {detail.Available === false
                                        ? `No availability found for ${dayjs().day(detail.day).format('dddd')}`
                                        : detail.Available && detail.start_time && detail.end_time
                                            ? `${dayjs().day(detail.day).format('dddd')}: Available from ${formatTime(detail.start_time)} to ${formatTime(detail.end_time)}`
                                            : detail.shiftStart && detail.shiftEnd
                                                ? `Shift already assigned for: ${formatDate(detail.date)} ${formatTime(detail.shiftStart)} - ${formatTime(detail.shiftEnd)}`
                                                : `No availability found for ${dayjs().day(detail.day).format('dddd')}`
                                    }
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
