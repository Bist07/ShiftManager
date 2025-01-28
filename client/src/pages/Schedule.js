import React from 'react';
import { useSchedule } from '../context/ScheduleContext';
import { Box, Typography } from '@mui/material';
import { ShiftTable, MonthlyShiftTable } from '../components/Schedule/Views'
import SideBar from '../components/Drawer/SideBar';

const Schedule = () => {
    const { viewMode, selectedWeek, selectedMonth, selectedYear, currentFilters, refetchTrigger } = useSchedule();
    return (
        <Box sx={{ display: 'flex', width: '100%', gap: 0, padding: 0 }}>
            <SideBar />
            <Box sx={{ width: '100%' }}>
                {(
                    viewMode === 'week' ? (
                        <ShiftTable week={selectedWeek} month={selectedMonth} year={selectedYear} filter={currentFilters} refetchTrigger={refetchTrigger} />
                    ) : viewMode === 'month' ? (
                        <MonthlyShiftTable month={selectedMonth} year={selectedYear} filter={currentFilters} refetchTrigger={refetchTrigger} />
                    ) : (
                        <Typography sx={{ p: 2 }}>Invalid view mode.</Typography>
                    )
                )}
            </Box>
        </Box>
    );
};

export default Schedule;
