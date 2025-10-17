import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedAllData = async () => {
  try {
    await Product.deleteMany();
    
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
      // Electronics
      {
        name: 'iPhone 14 Pro',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        description: 'Latest iPhone with advanced camera system',
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
      },
      {
        name: 'Samsung Galaxy S23',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
        description: 'Android smartphone with great camera',
        brand: 'Samsung',
        category: electronics._id,
        price: 799.99,
        countInStock: 15,
        rating: 4.3,
        numReviews: 20,
        user: admin._id,
      },
      // Clothing
      {
        name: 'Nike Air Max',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        description: 'Comfortable running shoes',
        brand: 'Nike',
        category: clothing._id,
        price: 129.99,
        countInStock: 25,
        rating: 4.2,
        numReviews: 15,
        user: admin._id,
      },
      {
        name: 'Levi\'s Jeans',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
        description: 'Classic denim jeans',
        brand: 'Levi\'s',
        category: clothing._id,
        price: 79.99,
        countInStock: 30,
        rating: 4.0,
        numReviews: 25,
        user: admin._id,
      },
      // Books
      {
        name: 'JavaScript: The Good Parts',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        description: 'Essential JavaScript programming book',
        brand: 'O\'Reilly',
        category: books._id,
        price: 29.99,
        countInStock: 50,
        rating: 4.7,
        numReviews: 100,
        user: admin._id,
      },
      {
        name: 'Clean Code',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        description: 'A handbook of agile software craftsmanship',
        brand: 'Prentice Hall',
        category: books._id,
        price: 39.99,
        countInStock: 40,
        rating: 4.6,
        numReviews: 80,
        user: admin._id,
      },
      // Home & Garden
      {
        name: 'Plant Pot Set',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
        description: 'Beautiful ceramic plant pots',
        brand: 'HomeDecor',
        category: homeGarden._id,
        price: 49.99,
        countInStock: 20,
        rating: 4.1,
        numReviews: 10,
        user: admin._id,
      },
      {
        name: 'Garden Tools Set',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
        description: 'Complete gardening tools kit',
        brand: 'GardenPro',
        category: homeGarden._id,
        price: 89.99,
        countInStock: 12,
        rating: 4.4,
        numReviews: 18,
        user: admin._id,
      }
    ];

    await Product.insertMany(products);
    console.log('All products seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAllData();