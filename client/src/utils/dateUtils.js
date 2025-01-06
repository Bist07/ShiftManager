import dayjs from 'dayjs';

export const formatTime = (time) => {
    if (!time) return 'N/A';
    const date = new Date(`1970-01-01T${time}`);
    let formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    // Replace lowercase 'a.m.'/'p.m.' with uppercase 'AM'/'PM' and remove the period.
    formattedTime = formattedTime.replace(/(a.m.|p.m.)/, (match) => match.toUpperCase().replace('.', '').replace('.', ''));

    return formattedTime;
};

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatWeek = (isoString) => {
    const localDate = getLocalDate(isoString);
    const formattedDate = `${localDate.getDate()} ${localDate.toLocaleString('default', { month: 'short' })}`;
    return formattedDate;
};

export const generateWeeks = (dates) => {
    const newWeeks = [];
    let week = [];

    dates.forEach((item) => {
        // Add the current date and date_id to the current week
        const newDate = formatDate(item.date);
        week.push({
            date: newDate,
            date_id: item.date_id
        });

        // Check if it's the last day of the week (Saturday, 7, 14, 21, etc.)
        if (new Date(item.date).getDate() % 7 === 0) {
            newWeeks.push(week);  // Push the current week to the newWeeks array
            week = [];  // Reset the week for the next set of dates
        }
    });

    if (week.length > 0) {
        newWeeks.push(week);  // Push any remaining days as the last week
    }

    return newWeeks;
};

export const getLocalDate = (date) => {
    const [year, month, day] = (date).split('-');
    const localDate = new Date(year, month - 1, day);
    return localDate;
};

export const mapWeekToDays = (week) => {
    if (!week || week.length === 0) {
        return {}; // Return an empty object if the week is null or an empty array
    }
    const mappedWeek = {};

    week.forEach((dayObj) => {

        const localDate = getLocalDate(dayObj.date);
        const dayName = new Date(localDate).toLocaleString('en-us', { weekday: 'long' }); // Get day name (e.g., "Sunday")

        // Directly store the date, no need for an array
        mappedWeek[dayName] = dayObj.date;
    });
    return mappedWeek;
};


export const getDaysInMonth = (month, year) => {
    const firstDay = dayjs(new Date(year, month - 1, 1)); // First day of the month
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

export const getHours = (startTime, endTime) => {
    const date1 = new Date(`1970-01-01T${startTime}Z`);
    const date2 = new Date(`1970-01-01T${endTime}Z`);
    const diffInMilliseconds = date2 - date1;
    const diffInMinutes = diffInMilliseconds / (1000 * 60);
    const diffHours = Math.floor(diffInMinutes / 60);
    const diffRemainingMinutes = diffInMinutes % 60;

    // Return the values for use in other functions as well as the formatted string
    return {
        diffHours,
        diffRemainingMinutes,
        formatted: diffRemainingMinutes === 0
            ? `${diffHours}h`
            : `${diffHours}h ${diffRemainingMinutes}min`
    };
};
