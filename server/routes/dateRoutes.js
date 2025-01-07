// routes/shiftRoutes.js
import express from 'express';
import { getDates, updateDate, getDatesForShift } from '../controllers/DateController.js';


export const router = express.Router();

// Define the GET route for dates
router.get('/', getDates);

// Define the GET route for dates
router.get('/dateIds', async (req, res) => {
    const { repeat } = req.query;

    try {
        const result = await getDatesForShift(repeat);
        res.status(200).json(result); // Send success response
    } catch (error) {
        console.error('Error in getting dates:', error);
        res.status(500).json({ message: 'Failed to get date_ids.' });
    }
});

// Put route to update a dates
router.put('/update', updateDate);
