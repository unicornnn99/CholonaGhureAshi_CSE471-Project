import mongoose from 'mongoose';

const tripModel = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    Location: {
        type: String,
        required: true,
        trim: true
    },
    Hotel: {
        type: String,
        required: true,
        trim: true
    },
    from: {
        type: Date,
        required: true,
        trim: true
    },
    to: {
        type: Date,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        trim: true
    }

}, 
{
    timestamps: true,
}
);

const Trip= mongoose.model('trips', tripModel);

export default Trip;