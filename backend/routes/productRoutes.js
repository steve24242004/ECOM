// backend/routes/productRoutes.js
import express from "express";
import Product from "../models/productModel.js";
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a product (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      user: req.user._id,
    });
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

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Update a product (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Delete a product (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    await Product.deleteOne({ _id: product._id });
    return res.json({ message: "Product removed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Test route to seed sample data
router.post("/seed", async (req, res) => {
  try {
    await Product.deleteMany();
    
    const sampleProducts = [
      {
        name: 'Airpods Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
        description: 'Bluetooth technology lets you connect it with compatible devices wirelessly',
        brand: 'Apple',
        category: 'Electronics',
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: 'iPhone 11 Pro 256GB Memory',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        description: 'Introducing the iPhone 11 Pro. A transformative triple-camera system',
        brand: 'Apple',
        category: 'Electronics',
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
      },
      {
        name: 'Cannon EOS 80D DSLR Camera',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
        description: 'Characterized by versatile imaging specs, the Canon EOS 80D',
        brand: 'Cannon',
        category: 'Electronics',
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
      }
    ];
    
    const createdProducts = await Product.insertMany(sampleProducts);
    res.status(201).json({ message: 'Sample products created', products: createdProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
