// backend/routes/productRoutes.js
import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// Create a product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Get all products
router.get("/", async (_req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
