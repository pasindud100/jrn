import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Roofing", "Others"], // restrict to allowed others categories in front end
    },
    subCategory: {


      
      type: String,
      required: true,
      enum: [
        "Normal Roofing",
        "Tile Roofing",
        "Sub Product 1",
        "Sub Product 2",
        "Sub Product 3",
        "Sub Product 4",
        "Sub Product 5",
        "Sub Product 6",
        "Sub Product 7",
      ],
    },
    size: { type: String, required: true },
    color: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
