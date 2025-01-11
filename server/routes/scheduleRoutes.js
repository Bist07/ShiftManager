// routes/scheduleRoutes.js
import express from 'express';
import { getSchedule } from '../controllers/scheduleController.js';


export const router = express.Router();

router.post('/', getSchedule);