import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

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
