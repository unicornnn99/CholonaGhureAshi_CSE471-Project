import Trip from "../models/tripModel.js";
import Hotel from '../models/hotelModel.js';
import express from 'express';

const router= express.Router();

router.post('/trips', async (req, res)=> {
    try{ if (!req.body.customerName || !req.body.Location || !req.body.Hotel ){
        return res.status(400).send({
            message: 'All required fields: Customer Name, Location, Hotel'
        });
    }
    //finding cost
    const hotel = await Hotel.findOne({ hotel_name: req.body.Hotel });
    const duration = (new Date(req.body.to) - new Date(req.body.from)) / (1000 * 60 * 60 * 24);
    const totalCost = (hotel.roomRate * duration).toFixed(2);
    

    const newTrip = {
        customerName: req.body.customerName,
        Location: req.body.Location,
        Hotel: req.body.Hotel,
        from: req.body.from,
        to: req.body.to,
        cost: totalCost
    };

    const trip= await Trip.create(newTrip);

    return res.status(201).send(trip);

    } catch (err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;