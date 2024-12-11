import express from "express";
import Customer from "../models/newModels/customerModel.js";
import Product from "../models/newModels/productsModel.js";
import Invoice from "../models/newModels/invoiceModel.js";

const router = express.Router();

router.post("/invoices", async (req, res) => {
  try {
    const { date, time, customer, products, totals } = req.body;

    // to save customer
    const newCustomer = new Customer(customer);
    const savedCustomer = await newCustomer.save();

    // to save products
    const savedProducts = await Promise.all(
      products.map((product) => new Product(product).save())
    );

    // to save invoice
    const newInvoice = new Invoice({
      date,
      time,
      customer: savedCustomer._id,
      products: savedProducts.map((product) => product._id),
      totals,
    });

    const savedInvoice = await newInvoice.save();

    res
      .status(201)
      .json({ message: "Invoice created successfully", invoice: savedInvoice });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating invoice", error: error.message });
  }
});

router.get("/invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer", "name") // this populate customer details
      .populate("products", "name price"); // this ppulate product details
      await Invoice.find()
      

    const formattedInvoices = invoices.map((invoice) => ({
      invoiceNo: invoice._id,
      customerName: invoice.customer.name,
      date: invoice.date,
      time: invoice.time,
      products: invoice.products,
      totals: invoice.totals,
      status: "Paid",
    }));

    res.status(200).json(formattedInvoices);
  
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving invoices", error: error.message });
  }
});

router.put("/invoices/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Invoice updated successfully", updatedInvoice });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating invoice", error: error.message });
  }
});

router.delete("/invoices/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Invoice.findByIdAndDelete(id);
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting invoice", error: error.message });
  }
});

export default router;
