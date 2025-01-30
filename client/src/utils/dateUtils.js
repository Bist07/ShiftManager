import dayjs from 'dayjs';

export const isInSameWeek = (dayA, dayB) => {
    if (dayB == null) {
        return false;
    }

    return dayA.isSame(dayB, 'week');
};

export const generateWeekDates = (date) => {
    const startOfWeek = date.startOf('week');
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        weekDates.push((startOfWeek.add(i, 'day')));
    }
    return weekDates;
};

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getLocalDate = (date) => {
    const [year, month, day] = date.split('-');

    // Subtract 1 from the month to adjust for zero-indexing
    const localDate = new Date(year, month - 1, day);
    return localDate;
};

export const getDaysInMonth = (month, year) => {
    const firstDay = dayjs(new Date(year, month, 1)); // First day of the month
    const lastDay = firstDay.endOf('month'); // Last day of the month

    const days = [];
    const startDayOfWeek = firstDay.day(); // Day of the week (0 = Sunday)
    const endDayOfWeek = lastDay.day(); // Day of the week (0 = Sunday)

    // Add preceding days from the previous month
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const prevDate = firstDay.subtract(i + 1, 'day');
        days.push(prevDate.format('YYYY-MM-DD')); // ISO format
    }

    // Add all days in the current month
    for (let i = 0; i < lastDay.date(); i++) {
        const currentDate = firstDay.add(i, 'day');
        days.push(currentDate.format('YYYY-MM-DD'));
    }

    // Add succeeding days from the next month
    for (let i = 1; i <= 6 - endDayOfWeek; i++) {
        const nextDate = lastDay.add(i, 'day');
        days.push(nextDate.format('YYYY-MM-DD'));
    }

    return days;
};



// Utility function to get all dates between two dates based on frequency and valid days
export const getDatesBetween = (startDate, endDate, frequency, days) => {
    const dates = [];
    let currentDate = dayjs(startDate); // Start from the given start date
    const remainingDays = 6 - dayjs(startDate).day();
    if (frequency === '') {
        frequency = 1;
    }

    if (days.length === 0) {
        days = [dayjs(startDate).day()]
    }

    if (!endDate || frequency === 1) {
        endDate = dayjs(startDate).add(remainingDays, 'day');
    }

    const end = dayjs(endDate).add(1, 'day');

    let max = Math.max(...days) + 1;


    // Loop until we reach the end date
    let i = 0;
    while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
        // Check every day within the frequency span
        let tempDate = currentDate.clone();
        let rangeEnd = currentDate.add(max, 'day').isBefore(end) ? currentDate.add(max, 'day') : end;
        while (tempDate.isBefore(rangeEnd)) {
            // Check if the current day is a valid shift day
            const formattedDate = tempDate.format('YYYY-MM-DD');

            if (days.includes(tempDate.day()) && !dates.includes(formattedDate)) {

                dates.push(formattedDate);
            }
            tempDate = tempDate.add(1, 'day'); // Move to the next day
        }

        // Move to the next frequency period (e.g., 14 days later)

        if (i <= 0 && frequency !== 1) {
            currentDate = currentDate.add(frequency - remainingDays, 'day')
        } else {
            currentDate = currentDate.add(frequency, 'day')
        }

        i++;
    }
    return dates;
};

// Filter dates by days of the week
export const filterByDaysOfWeek = (dates, days) => {
    return dates.filter(date => days.includes(date.day())); // `day()` returns a number from 0 (Sunday) to 6 (Saturday)
};

export const generateValidDates = (days, startDate, endDate, frequency) => {
    const allDates = getDatesBetween(startDate, endDate, frequency, days); // Generate all dates

    return allDates
};
