// backend/routes/testRoutes.js
import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

// Create dummy test data
// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category, inStock } = req.body;

    // Create product from schema
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      inStock,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


// Get all test data
router.get("/", async (_req, res) => {
  try {
    const all = await Test.find();
    return res.json(all);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
