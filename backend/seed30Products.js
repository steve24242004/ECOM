import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seed30Products = async () => {
  try {
    const electronics = await Category.findOne({ name: 'Electronics' });
    const clothing = await Category.findOne({ name: 'Clothing' });
    const books = await Category.findOne({ name: 'Books' });
    const homeGarden = await Category.findOne({ name: 'Home & Garden' });
    const admin = await User.findOne({ isAdmin: true });
    
    if (!admin) {
      console.log('Need admin user');
      process.exit(1);
    }

    const products = [
      // Electronics (10 products)
      { name: 'iPhone 15 Pro', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', description: 'Latest iPhone with titanium design and advanced camera system', brand: 'Apple', category: electronics._id, price: 1199.99, countInStock: 15, rating: 4.8, numReviews: 45, user: admin._id },
      { name: 'MacBook Air M2', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', description: 'Ultra-thin laptop with M2 chip for exceptional performance', brand: 'Apple', category: electronics._id, price: 1299.99, countInStock: 8, rating: 4.7, numReviews: 32, user: admin._id },
      { name: 'Samsung Galaxy S24', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', description: 'Android flagship with AI-powered camera and long battery life', brand: 'Samsung', category: electronics._id, price: 899.99, countInStock: 20, rating: 4.5, numReviews: 67, user: admin._id },
      { name: 'iPad Pro 12.9"', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', description: 'Professional tablet with M2 chip and Liquid Retina display', brand: 'Apple', category: electronics._id, price: 1099.99, countInStock: 12, rating: 4.6, numReviews: 28, user: admin._id },
      { name: 'Sony WH-1000XM5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', description: 'Premium noise-canceling wireless headphones', brand: 'Sony', category: electronics._id, price: 399.99, countInStock: 25, rating: 4.9, numReviews: 89, user: admin._id },
      { name: 'Dell XPS 13', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', description: 'Ultra-portable laptop with InfinityEdge display', brand: 'Dell', category: electronics._id, price: 999.99, countInStock: 10, rating: 4.4, numReviews: 41, user: admin._id },
      { name: 'Nintendo Switch OLED', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400', description: 'Gaming console with vibrant OLED screen', brand: 'Nintendo', category: electronics._id, price: 349.99, countInStock: 18, rating: 4.7, numReviews: 156, user: admin._id },
      { name: 'Canon EOS R6', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400', description: 'Full-frame mirrorless camera for professionals', brand: 'Canon', category: electronics._id, price: 2499.99, countInStock: 5, rating: 4.8, numReviews: 23, user: admin._id },
      { name: 'Apple Watch Series 9', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400', description: 'Advanced smartwatch with health monitoring', brand: 'Apple', category: electronics._id, price: 429.99, countInStock: 22, rating: 4.5, numReviews: 78, user: admin._id },
      { name: 'Samsung 4K Smart TV', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', description: '55-inch QLED TV with smart features', brand: 'Samsung', category: electronics._id, price: 799.99, countInStock: 7, rating: 4.3, numReviews: 34, user: admin._id },

      // Clothing (8 products)
      { name: 'Nike Air Max 270', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Comfortable running shoes with Max Air cushioning', brand: 'Nike', category: clothing._id, price: 149.99, countInStock: 35, rating: 4.4, numReviews: 92, user: admin._id },
      { name: 'Levi\'s 501 Original Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', description: 'Classic straight-fit denim jeans', brand: 'Levi\'s', category: clothing._id, price: 89.99, countInStock: 40, rating: 4.2, numReviews: 156, user: admin._id },
      { name: 'Adidas Ultraboost 22', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', description: 'High-performance running shoes with Boost technology', brand: 'Adidas', category: clothing._id, price: 179.99, countInStock: 28, rating: 4.6, numReviews: 73, user: admin._id },
      { name: 'Ralph Lauren Polo Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', description: 'Classic cotton polo shirt in various colors', brand: 'Ralph Lauren', category: clothing._id, price: 79.99, countInStock: 50, rating: 4.1, numReviews: 45, user: admin._id },
      { name: 'North Face Puffer Jacket', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400', description: 'Warm winter jacket with down insulation', brand: 'The North Face', category: clothing._id, price: 249.99, countInStock: 15, rating: 4.7, numReviews: 38, user: admin._id },
      { name: 'Converse Chuck Taylor', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', description: 'Iconic canvas sneakers in classic design', brand: 'Converse', category: clothing._id, price: 59.99, countInStock: 45, rating: 4.0, numReviews: 234, user: admin._id },
      { name: 'H&M Cotton T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', description: 'Basic cotton t-shirt in multiple colors', brand: 'H&M', category: clothing._id, price: 12.99, countInStock: 100, rating: 3.8, numReviews: 89, user: admin._id },
      { name: 'Zara Wool Coat', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400', description: 'Elegant wool coat for formal occasions', brand: 'Zara', category: clothing._id, price: 199.99, countInStock: 12, rating: 4.3, numReviews: 27, user: admin._id },

      // Books (7 products)
      { name: 'Clean Code by Robert Martin', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', description: 'A handbook of agile software craftsmanship', brand: 'Prentice Hall', category: books._id, price: 42.99, countInStock: 30, rating: 4.8, numReviews: 245, user: admin._id },
      { name: 'JavaScript: The Definitive Guide', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', description: 'Comprehensive guide to JavaScript programming', brand: 'O\'Reilly Media', category: books._id, price: 59.99, countInStock: 25, rating: 4.6, numReviews: 178, user: admin._id },
      { name: 'The Pragmatic Programmer', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', description: 'Your journey to mastery in software development', brand: 'Addison-Wesley', category: books._id, price: 49.99, countInStock: 20, rating: 4.7, numReviews: 156, user: admin._id },
      { name: 'Design Patterns', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', description: 'Elements of reusable object-oriented software', brand: 'Addison-Wesley', category: books._id, price: 54.99, countInStock: 15, rating: 4.5, numReviews: 89, user: admin._id },
      { name: 'You Don\'t Know JS Series', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', description: 'Deep dive into JavaScript mechanisms', brand: 'O\'Reilly Media', category: books._id, price: 39.99, countInStock: 35, rating: 4.9, numReviews: 312, user: admin._id },
      { name: 'System Design Interview', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400', description: 'An insider\'s guide to system design interviews', brand: 'ByteByteGo', category: books._id, price: 34.99, countInStock: 40, rating: 4.4, numReviews: 67, user: admin._id },
      { name: 'Atomic Habits', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', description: 'An easy and proven way to build good habits', brand: 'Avery', category: books._id, price: 18.99, countInStock: 60, rating: 4.7, numReviews: 1234, user: admin._id },

      // Home & Garden (5 products)
      { name: 'Ceramic Plant Pot Set', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', description: 'Set of 3 modern ceramic planters with drainage', brand: 'HomeDecor', category: homeGarden._id, price: 49.99, countInStock: 25, rating: 4.2, numReviews: 34, user: admin._id },
      { name: 'Garden Tool Set', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', description: 'Complete 10-piece gardening tools kit', brand: 'GardenPro', category: homeGarden._id, price: 89.99, countInStock: 18, rating: 4.5, numReviews: 56, user: admin._id },
      { name: 'LED String Lights', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', description: 'Waterproof outdoor string lights for patio', brand: 'Brightech', category: homeGarden._id, price: 29.99, countInStock: 50, rating: 4.3, numReviews: 123, user: admin._id },
      { name: 'Bamboo Cutting Board', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', description: 'Eco-friendly bamboo cutting board with juice groove', brand: 'Bambüsi', category: homeGarden._id, price: 24.99, countInStock: 40, rating: 4.6, numReviews: 89, user: admin._id },
      { name: 'Watering Can 2L', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', description: 'Galvanized steel watering can with long spout', brand: 'Behrens', category: homeGarden._id, price: 19.99, countInStock: 30, rating: 4.1, numReviews: 45, user: admin._id }
    ];

    await Product.insertMany(products);
    console.log('30 high-quality products seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed30Products();