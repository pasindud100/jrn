import express from "express";
const router = express.Router();
import {
  addProduct,
  getProductsByCategory,
  updateStock,
} from "../controllers/inventoryController.js";

router.post("/products", addProduct);
router.get("/products/category/:category", getProductsByCategory);
router.put("/products/:id", updateStock);

export default router;
