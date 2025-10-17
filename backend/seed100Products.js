import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seed100Products = async () => {
  try {
    
    const categories = await Category.find({});
    const admin = await User.findOne({ isAdmin: true });
    
    if (!admin || categories.length === 0) {
      console.log('Need admin user and categories');
      process.exit(1);
    }

    const productNames = [
      'iPhone', 'MacBook', 'Samsung Galaxy', 'iPad', 'AirPods', 'Dell Laptop', 'HP Printer', 'Canon Camera',
      'Nike Shoes', 'Adidas Sneakers', 'Levi Jeans', 'H&M Shirt', 'Zara Dress', 'Polo T-Shirt', 'Winter Jacket',
      'JavaScript Book', 'Python Guide', 'React Manual', 'Node.js Handbook', 'CSS Tricks', 'HTML5 Guide',
      'Plant Pot', 'Garden Tools', 'Lawn Mower', 'Flower Seeds', 'Watering Can', 'Garden Hose', 'Fertilizer'
    ];

    const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Dell', 'HP', 'Canon', 'Sony', 'LG', 'Microsoft'];
    
    const products = [];
    
    for (let i = 1; i <= 100; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomName = productNames[Math.floor(Math.random() * productNames.length)];
      const randomBrand = brands[Math.floor(Math.random() * brands.length)];
      
      products.push({
        name: `${randomName} ${i}`,
        image: `https://picsum.photos/400/300?random=${i}`,
        description: `High quality ${randomName.toLowerCase()} product with excellent features`,
        brand: randomBrand,
        category: randomCategory._id,
        price: Math.floor(Math.random() * 1000) + 10,
        countInStock: Math.floor(Math.random() * 50) + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        numReviews: Math.floor(Math.random() * 100) + 1,
        user: admin._id,
      });
    }

    await Product.insertMany(products);
    console.log('100 products seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed100Products();