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
        sx={{
            fontSize: '15px',
            textTransform: 'none',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            gap: '8px',
            borderRadius: '5px',
            border: '1px solid transparent', // Add border to mimic outlined style
            color: '#ebf5ff',
            '&:hover': { backgroundColor: '#1a1e22', borderColor: '#1d2126', },
        }}
    >
        <AutoFixHighIcon />
        Auto Assign
    </IconButton>
);

export default AutoAssignShifts;
