import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplierId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
});

export default mongoose.model("Supplier", supplierSchema);
