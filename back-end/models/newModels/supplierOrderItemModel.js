import mongoose from "mongoose";

const supplierOrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subTotal: { type: Number, required: true },
});

export default mongoose.model("SupplierOrderItem", supplierOrderItemSchema);
