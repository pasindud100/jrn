import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    telephone: { type: String, required: true, unique: true },
});
export default mongoose.model('Customer', customerSchema);