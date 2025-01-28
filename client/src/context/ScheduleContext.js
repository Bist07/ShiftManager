// ScheduleContext.js
import React, { createContext, useContext, useState } from 'react';

const ScheduleContext = createContext();

export const useSchedule = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState('week');
    const [selectedWeek, setSelectedWeek] = useState(null);
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
