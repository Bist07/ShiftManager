// routes/shiftRoutes.js
import express from 'express';
import { getDates, updateDate } from '../controllers/DateController.js';


export const router = express.Router();

// Define the GET route for dates
router.get('/', getDates);

// Put route to update a dates
router.put('/update', updateDate);
