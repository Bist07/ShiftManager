
const dayNames = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
};

export const transformAvailability = (availability) => {
    if (!availability || availability.length === 0) {
        return []; // Return an empty array if the availability is invalid
    }

    const groupedAvailability = {};

    availability.forEach(({ e_id, day_of_week, start_time, end_time }) => {
        // Initialize the employee's data structure if it doesn't exist
        if (!groupedAvailability[e_id]) {
            groupedAvailability[e_id] = { e_id, availability: {} };
        }

        const dayName = dayNames[day_of_week];

        // Initialize the day's data structure if it doesn't exist
        if (!groupedAvailability[e_id].availability[dayName]) {
            groupedAvailability[e_id].availability[dayName] = [];
        }

        // Add the availability for the specific day
        groupedAvailability[e_id].availability[dayName].push({
            day_of_week,
            start_time: start_time || 'N/A',
            end_time: end_time || 'N/A',
        });
    });

    return Object.values(groupedAvailability); // Convert the object to an array of grouped availabilities
};

export const validateShiftAvailability = (e_id, day, start_time, end_time, availability) => {
    // Ensure valid input
    if (!e_id || !day || !start_time || !end_time || !availability) {
        return false;
    }

    // Get availability slots for the specified day using the helper function
    const dayAvailability = getEmployeeAvailabilityForDay(e_id, day, availability);

    if (!dayAvailability) {
        return false; // No availability found for the employee or the specific day
    }

    // Check the shift against each available time slot for the day
    for (const { availabilityStart, availabilityEnd } of dayAvailability) {
        // Validate if the shift falls within any available time slot
        if (start_time >= availabilityStart && end_time <= availabilityEnd) {
            return true; // Valid shift
        }
    }

    return false; // The shift does not fit within any available time slot
};

export const getEmployeeAvailabilityForDay = (e_id, day, availability) => {
    if (!e_id || !day || !availability) {
        return [];
    }

    const employeeAvailability = availability.find((entry) => entry.e_id === e_id);
    if (!employeeAvailability || !employeeAvailability.availability[day]) {
        return [];
    }

    const dayAvailability = employeeAvailability.availability[day];

    // Ensure it's an array before mapping
    if (!Array.isArray(dayAvailability)) {
        return [];
    }

    return dayAvailability.map((slot) => ({
        availabilityStart: slot.start_time,
        availabilityEnd: slot.end_time,
    }));
};
