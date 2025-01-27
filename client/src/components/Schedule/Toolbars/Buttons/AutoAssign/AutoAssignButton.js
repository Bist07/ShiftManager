import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import AutoAssignDialog from './AutoAssignDialog';

const AutoAssignShifts = ({ unassignedShiftsByDate }) => {

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSave = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            {/* Button to trigger the dialog */}

            <AutoAssignButton onClick={handleClickOpen} />

            {/* Dialog for selecting employee and time */}
            <AutoAssignDialog open={openDialog} onSave={handleSave} onClose={handleClose} />

        </div>
    );
};

const AutoAssignButton = ({ shift, onClick }) => (
    <IconButton
        onClick={() => onClick(shift)}
    >
        <AutoFixHighIcon />
        Auto Assign
    </IconButton>
);

export default AutoAssignShifts;
