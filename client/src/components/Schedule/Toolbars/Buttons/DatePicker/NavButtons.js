import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSchedule } from '../../../../../context/ScheduleContext';
import React, { useState, useEffect } from 'react';
import { generateWeekDates } from '../../../../../utils';
import {
    IconButton
} from '@mui/material';

const NavButtons = ({ type }) => {
    const {
        viewMode,
        setDate, date,
        selectedWeek, setSelectedWeek,
        selectedMonth, setSelectedMonth,
        selectedYear, setSelectedYear,
    } = useSchedule();
    const weeks = [];

    const handlePrev = () => {
        if (viewMode !== 'month') {
            const firstDayOfWeek = selectedWeek[0]; // Get the first day of the current week
            const prevWeekStart = firstDayOfWeek.subtract(1, 'day').startOf('week'); // Move back one day, then get the start of the week
            setDate(prevWeekStart)
            setSelectedWeek(generateWeekDates(prevWeekStart)); // Generate the new week and update state
        } else {
            const newDate = date.subtract(1, 'month');
            setDate(newDate)
            setSelectedMonth(newDate.format('M') - 1)
            setSelectedYear(newDate.format('YYYY'))
        }
    };

    const handleNext = () => {
        if (viewMode !== 'month') {
            const lastDayOfWeek = selectedWeek[selectedWeek.length - 1]; // Get the last day of the current week
            const nextWeekStart = lastDayOfWeek.add(1, 'day').startOf('week'); // Move forward one day, then get the start of the next week
            setDate(nextWeekStart)
            setSelectedWeek(generateWeekDates(nextWeekStart)); // Generate the new week and update state
        } else {
            const newDate = date.add(1, 'month');
            setDate(newDate)
            setSelectedMonth(newDate.format('M') - 1)
            setSelectedYear(newDate.format('YYYY'))
        }
    };


    return (

        <IconButton
            varient="contained"
            onClick={type === 'Next' ? handleNext : handlePrev}
        >
            {type === 'Next' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </IconButton>


    )
}

export default NavButtons;