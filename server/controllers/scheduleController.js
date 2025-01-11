import axios from "axios";

exports.schedule = async (req, res) => {
    try {
        const pythonServerUrl = 'http://localhost:5001/schedule';
        const response = await axios.post(pythonServerUrl, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error from Python server:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
