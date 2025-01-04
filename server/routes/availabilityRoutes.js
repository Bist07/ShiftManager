// routes/availabilityRoutes.js
import express from 'express';
import { getAvailability, createAvailability, updateAvailability } from '../controllers/availabilityController.js';


export const router = express.Router();


router.get('/', getAvailability);
router.put('/update', updateAvailability);
router.post('/create', createAvailability);
