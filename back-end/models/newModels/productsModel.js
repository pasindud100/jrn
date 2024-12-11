import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: { type: String, required: true },
  gauge: { type: String },
  unit: { type: String },
  color: { type: String },
  qty: { type: Number, required: true },
  uPrice: { type: Number, required: true },
  discount: { type: Number },
  total: { type: Number, required: true },
});

export default mongoose.model('Products-invoice', productSchema);
