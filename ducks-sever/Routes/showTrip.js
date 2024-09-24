import express from 'express';
import Trip from '../models/tripModel.js'; 
const router = express.Router();

router.get('/showtrip', async (req, res) => {
    try {
        const trips = await Trip.find({})
        if (!trips.length) {
            return res.status(404).send({ message: 'No trips found for this user.' });
        }
        res.status(200).json(trips); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'An error occurred while fetching trips.' });
    }
});

export default router;
