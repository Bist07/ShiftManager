export const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const formatTime = (time) => {
    if (!time) return 'N/A';
    const date = new Date(`1970-01-01T${time}`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatWeek = (isoString) => {
    const date = new Date(isoString);
    const month = months[date.getMonth()].slice(0, 3); // Get first 3 letters of the month

    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${month}`;
};


export const parseTime = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}Z`);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};

export const parseDate = (formattedDate) => {
    if (!formattedDate) return null; // Handle case for undefined or null input

    const [year, month, day] = formattedDate.split('-');

    // Check if the parts are valid
    if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
        throw new RangeError('Invalid date format');
    }

    const parsedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    // Ensure the date is valid
    if (isNaN(parsedDate)) {
        throw new RangeError('Invalid date');
    }

    return parsedDate.toISOString();
};


export const validateTimes = (start_time, end_time) => {
    const start = new Date(`1970-01-01T${start_time}`);
    const end = new Date(`1970-01-01T${end_time}`);
    return start < end;
};

export const generateWeeks = (dates) => {
    const newWeeks = [];
    let week = [];

    dates.forEach((item) => {
        // Add the current date and date_id to the current week
        week.push({
            date: item.date,
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

export const mapWeekToDays = (week) => {
    if (!week || week.length === 0) {
        return {}; // Return an empty object if the week is null or an empty array
    }

    const mappedWeek = {};

    week.forEach((day) => {
        const dayName = new Date(day.date).toLocaleString('en-us', { weekday: 'long' }); // Get day name (e.g., "Sunday")
        if (!mappedWeek[dayName]) {
            mappedWeek[dayName] = []; // Initialize the array if it doesn't exist
        }
        mappedWeek[dayName].push(day); // Add the day to the corresponding day name array
    });

    return mappedWeek;
};

export const getDaysInMonth = (month, year) => {
    const date = new Date(year, month - 1, 1);
    const days = [];
    while (date.getMonth() === month - 1) {
        days.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
        date.setDate(date.getDate() + 1);
    }
    return days;
};
