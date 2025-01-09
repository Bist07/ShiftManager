// logic/roleLogic.js
import { getRolesModel } from '../models/roleModel.js';

// Logic to get roles
export const getRolesLogic = async () => {
    try {
        const roles = await getRolesModel();

        // Return the roles fetched from the database
        return roles;
    } catch (error) {
        console.error('Error fetching roles in logic layer:', error);
        throw new Error('An error occurred while fetching roles');
    }
};
