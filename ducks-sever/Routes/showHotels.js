import express from 'express';
import Hotel from '../models/hotelModel.js';
const router= express.Router();

router.get('/hotels', async (req, res) => {
    try{
        const hotels = await Hotel.find({ });
        return res.json(hotels)
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});
export default router;