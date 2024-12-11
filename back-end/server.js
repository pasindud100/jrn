import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = 8000;
const Mongo_url = process.env.MONGO_URL;

mongoose
  .connect(Mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import inventoryRoutes from "./routers/inventoryRoutes.js";
app.use("/inventory", inventoryRoutes);

import authRoutes from "./routers/authRoutes.js";
app.use("/api/auth", authRoutes);

import employeeRouter from "./routers/userRouters/employeeRouter.js";
app.use("/api/employees", employeeRouter);

import grantAccessRoutes from "./routers/userRouters/grantAccessRouter.js"; // Adjust the path as ne
app.use("/api", grantAccessRoutes);

import invoiceRoutes from "./routers/invoiceRoutes.js";
app.use("/api", invoiceRoutes);
