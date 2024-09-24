import mongoose from 'mongoose';

const destinationModel = new mongoose.Schema({
    dest: { type: String, required: true },
    info: { type: String }
});

const Destination = mongoose.model('Destination', destinationModel);

export default Destination;
