// src/utils/menuHelpers.js

export const openMenu = (anchorEl) => Boolean(anchorEl);

export const closeMenu = (setAnchorEl) => () => setAnchorEl(null);

export const handleSelectMonth = (setSelectedMonth, setMonthAnchorEl) => (month) => {
    setSelectedMonth(month);
    setMonthAnchorEl(null);
};

export const handleSelectYear = (setSelectedYear, setYearAnchorEl) => (year) => {
    setSelectedYear(year);
    setYearAnchorEl(null);
};

export const handleSelectWeek = (setSelectedWeek, setWeekAnchorEl) => (week) => {
    setSelectedWeek(week);
    setWeekAnchorEl(null);
};
