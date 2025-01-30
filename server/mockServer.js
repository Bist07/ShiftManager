import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000; // Different port for mock server

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

// 🔹 Mock Data
const mockAssignments =
    [
        {
            "assignment_id": 1,
            "employee_id": 1,
            "shift_id": 1
        },
        {
            "assignment_id": 2,
            "employee_id": 2,
            "shift_id": 2
        },
        {
            "assignment_id": 3,
            "employee_id": 3,
            "shift_id": 3
        }
    ]

const mockShifts =
    [

        {
            "name": "Alice Smith",
            "e_id": 1,
            "shift_id": 1,
            "full_date": "2025-01-02T08:00:00.000Z",
            "location_id": 2,
            "location_name": "Warehouse B",
            "start_time": "01:00:00",
            "end_time": "14:00:00",
            "position_id": 1,
            "position_name": "Manager"
        },
        {
            "name": "Bob Johnson",
            "e_id": 2,
            "shift_id": 2,
            "full_date": "2025-01-01T08:00:00.000Z",
            "location_id": 1,
            "location_name": "Warehouse A",
            "start_time": "00:00:00",
            "end_time": "02:00:00",
            "position_id": 1,
            "position_name": "Manager"
        },

        {
            "name": "Carol Williams",
            "e_id": 3,
            "shift_id": 3,
            "full_date": "2025-01-02T08:00:00.000Z",
            "location_id": 1,
            "location_name": "Warehouse A",
            "start_time": "00:00:00",
            "end_time": "02:00:00",
            "position_id": 1,
            "position_name": "Manager"
        },
        {
            "shift_id": 12,
            "e_id": null,
            "start_time": "09:00:00",
            "end_time": "17:00:00",
            "full_date": "2025-01-01T08:00:00.000Z",
            "date_id": 12,
            "location_id": 1,
            "location_name": "Warehouse A",
            "position_id": 2,
            "position_name": "Staff"
        },
        {
            "shift_id": 21,
            "e_id": null,
            "start_time": "13:00:00",
            "end_time": "00:00:00",
            "full_date": "2025-01-02T08:00:00.000Z",
            "date_id": 15,
            "location_id": 1,
            "location_name": "Warehouse A",
            "position_id": 2,
            "position_name": "Staff"
        },
        {
            "shift_id": 22,
            "e_id": null,
            "start_time": "13:00:00",
            "end_time": "00:00:00",
            "full_date": "2025-01-02T08:00:00.000Z",
            "date_id": 15,
            "location_id": 1,
            "location_name": "Warehouse A",
            "position_id": 2,
            "position_name": "Staff"
        },

    ]

const mockLocations = [
    {
        "location_id": 1,
        "name": "Warehouse A",
        "address": "1234 Industrial Rd"
    },
    {
        "location_id": 2,
        "name": "Warehouse B",
        "address": "5678 Commerce Ave"
    },
    {
        "location_id": 3,
        "name": "Office",
        "address": "9102 Business Blvd"
    }
]

const mockAvailability = [
    {
        "availability_id": 4,
        "e_id": 1,
        "day_of_week": 1,
        "start_time": "08:00:00",
        "end_time": "16:00:00"
    },
    {
        "availability_id": 5,
        "e_id": 2,
        "day_of_week": 2,
        "start_time": "09:00:00",
        "end_time": "17:00:00"
    },
    {
        "availability_id": 6,
        "e_id": 3,
        "day_of_week": 5,
        "start_time": "10:00:00",
        "end_time": "18:00:00"
    },
    {
        "availability_id": 10,
        "e_id": 3,
        "day_of_week": 1,
        "start_time": "08:00:00",
        "end_time": "16:00:00"
    },
    {
        "availability_id": 11,
        "e_id": 1,
        "day_of_week": 2,
        "start_time": "09:00:00",
        "end_time": "17:00:00"
    },
    {
        "availability_id": 12,
        "e_id": 2,
        "day_of_week": 5,
        "start_time": "10:00:00",
        "end_time": "18:00:00"
    }
]

const mockEmployees = [
    {
        "e_id": 1,
        "first_name": "Alice",
        "last_name": "Smith",
        "email": "alice.smith@example.com",
        "position_id": 1,
        "created_at": "2024-12-13T05:39:49.000Z",
        "status_id": null,
        "role_id": 0
    },
    {
        "e_id": 2,
        "first_name": "Bob",
        "last_name": "Johnson",
        "email": "bob.johnson@example.com",
        "position_id": 2,
        "created_at": "2024-12-13T05:39:49.000Z",
        "status_id": null,
        "role_id": 0
    },
    {
        "e_id": 3,
        "first_name": "Carol",
        "last_name": "Williams",
        "email": "carol.williams@example.com",
        "position_id": 1,
        "created_at": "2024-12-13T05:39:49.000Z",
        "status_id": null,
        "role_id": 0
    },
    {
        "e_id": 4,
        "first_name": "David",
        "last_name": "Brown",
        "email": "david.brown@example.com",
        "position_id": 3,
        "created_at": "2024-12-13T05:39:49.000Z",
        "status_id": null,
        "role_id": 0
    },
    {
        "e_id": 5,
        "first_name": "Eve",
        "last_name": "Davis",
        "email": "eve.davis@example.com",
        "position_id": 2,
        "created_at": "2024-12-13T05:39:49.000Z",
        "status_id": null,
        "role_id": 0
    }
]

const mockPositions = [
    {
        "position_id": 1,
        "name": "Manager"
    },
    {
        "position_id": 2,
        "name": "Staff"
    },
    {
        "position_id": 3,
        "name": "Supervisor"
    }
]

const mockRoles = [
    {
        "role_id": 1,
        "name": "admin"
    },
    {
        "role_id": 2,
        "name": "manager"
    },
    {
        "role_id": 3,
        "name": "employee"
    }
]

const mockPreferences = [
    {
        "preference_id": 1,
        "position_id": 1,
        "e_id": 1,
        "location_id": 1,
        "MaxWeeklyHours": 40
    },
    {
        "preference_id": 2,
        "position_id": 2,
        "e_id": 2,
        "location_id": 2,
        "MaxWeeklyHours": 20
    },
    {
        "preference_id": 3,
        "position_id": 1,
        "e_id": 3,
        "location_id": 3,
        "MaxWeeklyHours": 40
    },
]

// 📌 Availability API
app.get('/api/availability', (req, res) => res.json(mockAvailability));

app.post('/api/availability/create', (req, res) => {
    const { e_id, day_of_week, start_time, end_time } = req.body;
    mockAvailability.push({ e_id, day_of_week, start_time, end_time });
    res.json({ success: true });
});

app.put('/api/availability/update', (req, res) => {
    const { e_id, day_of_week, start_time, end_time } = req.body;
    const index = mockAvailability.findIndex(a => a.e_id === e_id && a.day_of_week === day_of_week);
    if (index !== -1) {
        mockAvailability[index] = { e_id, day_of_week, start_time, end_time };
        return res.json({ success: true });
    }
    res.status(404).json({ message: "Availability not found" });
});

// 📌 Employees API
app.get('/api/employees', (req, res) => res.json(mockEmployees));

app.post('/api/employees/create', (req, res) => {
    const { first_name, last_name, email } = req.body;
    const newEmployee = { e_id: mockEmployees.length + 1, first_name, last_name, email };
    mockEmployees.push(newEmployee);
    res.json(newEmployee);
});

app.put('/api/employees/update', (req, res) => {
    const { e_id, first_name, last_name, email } = req.body;
    const employee = mockEmployees.find(emp => emp.e_id === e_id);
    if (employee) {
        employee.first_name = first_name;
        employee.last_name = last_name;
        employee.email = email;
        return res.json(employee);
    }
    res.status(404).json({ message: "Employee not found" });
});

app.delete('/api/employees/delete', (req, res) => {
    const { e_id } = req.query;
    const index = mockEmployees.findIndex(emp => emp.e_id == e_id);
    if (index !== -1) {
        mockEmployees.splice(index, 1);
        return res.json({ success: true });
    }
    res.status(404).json({ message: "Employee not found" });
});

// 📌 Shifts API
app.get('/api/shifts', (req, res) => res.json(mockShifts));

app.get('/api/shifts/unassigned', (req, res) => {
    const unassignedShifts = mockShifts.filter(shift => shift.e_id === null);
    res.json(unassignedShifts);
});


app.post('/api/shifts/create', (req, res) => {
    const { date, repeat, e_id, position_id, location_id, start_time, end_time } = req.body;
    const newShift = { shift_id: mockShifts.length + 1, date, repeat, e_id, position_id, location_id, start_time, end_time };
    mockShifts.push(newShift);
    res.json(newShift);
});

app.put('/api/shifts/update', (req, res) => {
    const { shift_id, start_time, end_time, location_id, position_id } = req.body;
    const shift = mockShifts.find(s => s.shift_id === shift_id);
    if (shift) {
        shift.start_time = start_time;
        shift.end_time = end_time;
        shift.location_id = location_id;
        shift.position_id = position_id;
        return res.json(shift);
    }
    res.status(404).json({ message: "Shift not found" });
});

app.delete('/api/shifts/delete', (req, res) => {
    const { shift_id } = req.query;
    const index = mockShifts.findIndex(s => s.shift_id == shift_id);
    if (index !== -1) {
        mockShifts.splice(index, 1);
        return res.json({ success: true });
    }
    res.status(404).json({ message: "Shift not found" });
});

// 📌 Locations API
app.get('/api/locations', (req, res) => res.json(mockLocations));

// 📌 Positions API
app.get('/api/positions', (req, res) => res.json(mockPositions));

// 📌 Preferences API
app.get('/api/preference', (req, res) => res.json(mockPreferences));

// 📌 Roles API
app.get('/api/roles', (req, res) => res.json(mockRoles));

// Start mock server
app.listen(PORT, () => console.log(`Mock server running at http://localhost:${PORT}`));

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down mock server...');
    process.exit(0);
});