// ScheduleContext.js
import React, { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { generateWeekDates } from '../utils';

const ScheduleContext = createContext();

export const useSchedule = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState('week');
    const [date, setDate] = useState(dayjs(new Date()));
    const [selectedWeek, setSelectedWeek] = useState(generateWeekDates(dayjs(new Date())));
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [currentFilters, setCurrentFilters] = useState({

        Employee: [],
        Location: [],
        Position: [],
    });
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    return (
        <ScheduleContext.Provider value={{
            viewMode, setViewMode,
            date, setDate,
            selectedWeek, setSelectedWeek,
            selectedMonth, setSelectedMonth,
            selectedYear, setSelectedYear,
            currentFilters, setCurrentFilters,
            refetchTrigger, setRefetchTrigger,
        }}>
            {children}
        </ScheduleContext.Provider>
    );
};
