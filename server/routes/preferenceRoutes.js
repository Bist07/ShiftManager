// routes/preferenceRoutes.js
import express from 'express';
import { getPreference } from '../controllers/preferenceController.js';


export const router = express.Router();

// Define the GET route for preference
router.get('/', getPreference);