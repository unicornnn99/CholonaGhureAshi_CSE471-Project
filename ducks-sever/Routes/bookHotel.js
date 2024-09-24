import Trip from "../models/tripModel.js";
import Hotel from '../models/hotelModel.js';
import express from 'express';

const router= express.Router();

router.post('/bookHotel/:id', async (req, res)=> {
    try{ if (!req.body.customerName || !req.body.from || !req.body.to ){
        return res.status(400).send({
            message: 'All fields required'
        });
    }
    const hotel = await Hotel.findOne({ hotel_id: req.params.id });

    const duration = (new Date(req.body.to) - new Date(req.body.from)) / (1000 * 60 * 60 * 24);
    const totalCost = hotel.roomRate * duration;
    

    const newTrip = {
        customerName: req.body.customerName,
        Location: hotel.location,
        Hotel: hotel.hotel_name,
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