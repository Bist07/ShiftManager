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
        formatted: diffHours === 0
            ? `${diffRemainingMinutes}min`
            : diffRemainingMinutes === 0
                ? `${diffHours}h`
                : `${diffHours}h ${diffRemainingMinutes}min`
    };
};



export const formatTime = (time) => {
    if (!time) return 'N/A';
    const date = new Date(`1970-01-01T${time}`);
    let formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    // Replace lowercase 'a.m.'/'p.m.' with uppercase 'AM'/'PM' and remove the period.
    formattedTime = formattedTime.replace(/(a.m.|p.m.)/, (match) => match.toUpperCase().replace('.', '').replace('.', ''));
    return formattedTime;
};
