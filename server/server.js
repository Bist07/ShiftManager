import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import your routes (Ensure this file exists)
import { router as shiftRoutes } from './routes/shiftRoutes.js';
import { router as dateRoutes } from './routes/dateRoutes.js';
import { router as locationRoutes } from './routes/locationRoutes.js';
import { router as assignmentRoutes } from './routes/assignmentRoutes.js';
import { router as availabilityRoutes } from './routes/availabilityRoutes.js';
import { router as employeeRoutes } from './routes/employeeRoutes.js';
import { router as shiftBulkOperations } from './routes/shiftBulkOperationsRoute.js'
import { router as roleRoutes } from './routes/roleRoutes.js'

const app = express();

// Use middleware
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

// Use the routes
app.use('/api/shifts', shiftRoutes)
app.use('/api/dates', dateRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/availability', availabilityRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/shiftBulkOperations', shiftBulkOperations)
app.use('/api/roles/', roleRoutes)

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('Gracefully shutting down...');
    server.close(() => {
        console.log('Closed all connections');
        process.exit(0);
    });
});