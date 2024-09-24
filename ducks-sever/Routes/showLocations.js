import express from 'express';
import destination from '../models/destinationModel.js';

const router= express.Router();

router.get('/locations', async (req, res) => {
    try{
        const destinations= await destination.find({});
        return res.json(destinations)
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;