import User from "../models/userModel.js";
import express from 'express';

const router= express.Router();

router.post('/signup', async (req, res)=> {
    try{ if (!req.body.name || !req.body.lastName || !req.body.address ){
        return res.status(400).send({
            message: 'All required fields: Customer Name, Location, Hotel'
        });
    }
    const newUser = {
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
       
    };

    const user= await userModel.create(User);

    return res.status(201).send(user);

    } catch (err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;