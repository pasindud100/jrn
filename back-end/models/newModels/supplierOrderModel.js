import mongoose from "mongoose";

const supplierOrderSchema = new mongoose.Schema({
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    supplierOrderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "SupplierOrderItem" }],
});

export default mongoose.model("SupplierOrder", supplierOrderSchema);
