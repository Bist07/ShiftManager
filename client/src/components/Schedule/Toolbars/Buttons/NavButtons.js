import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSchedule } from '../../../../context/ScheduleContext';
import React, { useState, useEffect } from 'react';
import { generateWeekDates } from '../../../../utils';
import {
    IconButton
} from '@mui/material';

const NavButtons = ({ type }) => {
    const {
        viewMode,
        setDate,
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
            if (selectedMonth === 0) {
                setSelectedMonth(11);
                setSelectedYear((prevYear) => prevYear - 1);
            } else {
                setSelectedMonth((prevMonth) => prevMonth - 1);
            }
        }
    };

    const handleNext = () => {
        if (viewMode !== 'month') {
            const lastDayOfWeek = selectedWeek[selectedWeek.length - 1]; // Get the last day of the current week
            const nextWeekStart = lastDayOfWeek.add(1, 'day').startOf('week'); // Move forward one day, then get the start of the next week
            setDate(nextWeekStart)
            setSelectedWeek(generateWeekDates(nextWeekStart)); // Generate the new week and update state
        } else {
            if (selectedMonth === 11) {
                setSelectedMonth(0);
                setSelectedYear((prevYear) => prevYear + 1);
            } else {
                setSelectedMonth((prevMonth) => prevMonth + 1);
            }
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