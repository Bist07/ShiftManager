// routes/locationRoutes.js
import express from 'express';
import { getLocation } from '../controllers/locationController.js';


export const router = express.Router();

// Define the GET route for location
router.get('/', getLocation);