import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
});

export default mongoose.model("Employee", employeeSchema);
