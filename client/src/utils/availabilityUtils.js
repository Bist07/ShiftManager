
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


        // Initialize the day's data structure if it doesn't exist
        if (!groupedAvailability[e_id].availability[day_of_week]) {
            groupedAvailability[e_id].availability[day_of_week] = [];
        }

        // Add the availability for the specific day
        groupedAvailability[e_id].availability[day_of_week].push({
            day_of_week,
            start_time: start_time || 'N/A',
            end_time: end_time || 'N/A',
        });
    });

    return Object.values(groupedAvailability); // Convert the object to an array of grouped availabilities
};

export const validateAvailability = (e_id, day, days = [], start_time, end_time, availability) => {
    // Ensure valid input
    if (!e_id || !day || !start_time || !end_time || !availability) {
        return false;
    }

    // Ensure the day is included in the days array
    if (!days.includes(day)) {
        days = [...days, day];
    }

    // Get availability slots for the specified days using the helper function
    const employeeAvailability = getEmployeeAvailabilityForDays(e_id, days, availability);

    if (!employeeAvailability || employeeAvailability.length === 0) {
        return false; // No availability found for the employee or the specific days
    }

    // Check if the shift falls within any available time slot
    return employeeAvailability.some(({ availabilityStart, availabilityEnd }) =>
        start_time >= availabilityStart && end_time <= availabilityEnd
    );
};

// Function to find conflicting slots
export const findConflictingSlots = (e_id, dayOfWeekIndex, repeatDays, start_time, end_time, availability) => {
    const employeeAvailability = getEmployeeAvailabilityForDays(e_id, repeatDays, availability);
    const conflicts = [];

    employeeAvailability.forEach(({ availabilityStart, availabilityEnd, day }) => {
        if (availabilityStart !== 'undefined') {

            conflicts.push({
                Available: true,
                day,
                start_time: availabilityStart,
                end_time: availabilityEnd,
                e_id,
            });

        } else {
            conflicts.push({
                Available: false,
                day,
                e_id,
            });
        }
    });


    // Group conflicts by employee ID (e_id)
    const groupedConflicts = conflicts.reduce((acc, detail) => {
        if (!acc[detail.e_id]) {
            acc[detail.e_id] = [];
        }
        acc[detail.e_id].push(detail);

        return acc;
    }, {});

    return groupedConflicts;
};



export const getEmployeeAvailabilityForDays = (e_ids, days, availability) => {
    if (!e_ids || !days || !availability) {
        return [];
    }

    // Ensure e_ids and days are arrays
    const employeeIds = Array.isArray(e_ids) ? e_ids : [e_ids];
    const daysArray = Array.isArray(days) ? days : [days];

    // Iterate over each employee ID and day to gather availability
    const result = [];
    employeeIds.forEach((e_id) => {
        const employeeAvailability = availability.find((entry) => entry.e_id === e_id);
        if (employeeAvailability) {
            daysArray.forEach((day) => {
                const dayAvailability = employeeAvailability.availability[day];
                if (Array.isArray(dayAvailability)) {
                    dayAvailability.forEach((slot) => {
                        result.push({
                            e_id,
                            day,
                            availabilityStart: slot.start_time,
                            availabilityEnd: slot.end_time,
                        });

                    });
                } else {
                    // Employee not available on this day
                    result.push({
                        e_id,
                        day,
                        available: false,
                    });
                }
            });
        } else {
            // No availability entry found for this employee
            daysArray.forEach((day) => {
                result.push({
                    e_id,
                    day,
                    available: false,
                });
            });
        }
    });


    return result;
};
