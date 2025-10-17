import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    
    const electronics = await Category.findOne({ name: 'Electronics' });
    const admin = await User.findOne({ isAdmin: true });
    
    if (!electronics || !admin) {
      console.log('Need Electronics category and admin user');
      process.exit(1);
    }

    const products = [
      {
        name: 'iPhone 14 Pro',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        description: 'Latest iPhone with advanced features',
        brand: 'Apple',
        category: electronics._id,
        price: 999.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
        user: admin._id,
      },
      {
        name: 'MacBook Pro',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        description: 'Powerful laptop for professionals',
        brand: 'Apple',
        category: electronics._id,
        price: 1999.99,
        countInStock: 5,
        rating: 4.8,
        numReviews: 8,
        user: admin._id,
      }
    ];

    await Product.insertMany(products);
    console.log('Products seeded with category references');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();