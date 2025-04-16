import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    barcode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    dose: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Medicine = mongoose.models?.medicine || mongoose.model('medicine', medicineSchema);

export default Medicine;