// routes/shiftRoutes.js
import express from 'express';
import { getDates, updateDate, getDatesForShift } from '../controllers/DateController.js';


export const router = express.Router();

// Define the GET route for dates
router.get('/', getDates);

// Define the GET route for dates
router.get('/dateIds', getDatesForShift);

// Put route to update a dates
router.put('/update', updateDate);
