// controllers/roletController.js
import { getRolesInDB } from '../models/roleModel.js';
import { validateFields } from '../utils/validateFields.js';

// Controller to handle getting roles
export const getRole = async (req, res) => {

    try {
        const roles = await getRolesInDB();

        // If no roles found
        if (roles.length === 0) {
            return res.status(404).send('No roles found');
        }

        // Return the roles data as response
        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching roles');
    }
};