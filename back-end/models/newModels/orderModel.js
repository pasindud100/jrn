import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderDate: { type: Date, default: Date.now },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    paymentStatus: { 
        type: String, 
        enum: ["Paid", "Not Paid", "Partially Paid"],
        default: "Paid" 
    },
    totalAmount: { type: Number, required: true },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
});

export default mongoose.model("Order", orderSchema);
