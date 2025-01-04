export const validateFields = (fields, res) => {
    for (const [field, value] of Object.entries(fields)) {
        if (Array.isArray(value)) {
            // If it's an array, check if it's not empty
            if (value.length === 0) {
                return res.status(400).send(`${field} must not be empty`);
            }
        } else if (!value) {
            // For non-array values, check if they are falsy
            return res.status(400).send(`${field} is required`);
        }
    }
    return null;
};
