import React, { useState, useEffect } from 'react';
import {
    Box, Toolbar, IconButton, ButtonGroup
} from '@mui/material';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import AddIcon from '@mui/icons-material/Add';
import { ShiftDialog } from '../Dialogs';
import dayjs from 'dayjs';
import { AutoAssignButton } from './Buttons/AutoAssign';
import { useSchedule } from '../../../context/ScheduleContext';
import WeekPicker from './Buttons/DatePicker/WeekPicker';
import NavButtons from './Buttons/DatePicker/NavButtons';
import MonthPicker from './Buttons/DatePicker/MonthPicker';

const ScheduleToolbar = () => {
    const {
        viewMode, setViewMode,
        selectedWeek,
        selectedMonth,
        selectedYear,
        setRefetchTrigger
    } = useSchedule();
    const [weeks, setWeeks] = useState([]);
    const [currentShift, setCurrentShift] = useState(null);

    useEffect(() => {
        setWeeks(selectedWeek)

    }, [selectedMonth, selectedYear]);

    const handleOpenDialog = () => {
        setCurrentShift({
        });
    };

    const handleCloseDialog = () => {
        setCurrentShift(null);
    };

    const handleSaveShift = () => {
        setRefetchTrigger((prev) => !prev);
        handleCloseDialog();
    };

    const handleAutoAssign = () => {

    };

    return (
        <Box >
            <Toolbar sx={{ border: 0, margin: 0 }}>
                <Box sx={{ display: 'flex', gap: '16px', height: '40px' }}>
                    <IconButton
                        onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
                    >
                        {viewMode === 'week' ? (
                            <>
                                Week <ViewWeekIcon />
                            </>
                        ) : (
                            <>
                                Month <ViewModuleRoundedIcon />
                            </>
                        )}

                    </IconButton>
                    <ButtonGroup>
                        <NavButtons type={'Prev'} />
                        {viewMode === 'week' ? <WeekPicker /> : <MonthPicker />}
                        <NavButtons type={'Next'} />
                    </ButtonGroup>
                </Box>

                {/* Box with flexGrow to push Tune button to the right */}
                <Box sx={{ display: 'flex', flexGrow: 1 }} />
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <AutoAssignButton onClick={handleAutoAssign} />
                    <IconButton
                        onClick={handleOpenDialog}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': { bgcolor: '#0077e5', borderColor: '#0077e5' },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                {
                    currentShift && (
                        <ShiftDialog
                            date={dayjs().format('YYYY-MM-DD')}
                            onSave={handleSaveShift}
                            open={handleOpenDialog}
                            onClose={handleCloseDialog}
                        />
                    )
                }
            </Toolbar >
        </Box >

    );
};

export default ScheduleToolbar;
