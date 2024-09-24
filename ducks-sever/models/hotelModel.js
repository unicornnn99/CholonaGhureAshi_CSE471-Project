import mongoose from 'mongoose';

const hotelModel = new mongoose.Schema({
    hotel_id: {type: String, required: true},
    hotel_name: { type: String },
    address: { type: String, required: true },
    Rating: {type: Number, required: true},
    roomRate: {type: Number, required: true},
    location: { type: String, required: true }
});

const Hotel = mongoose.model('hotels', hotelModel);

export default Hotel;
