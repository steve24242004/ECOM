import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const updateProducts = async () => {
  try {
    // First, temporarily change the schema to allow strings
    const products = await Product.find({}).lean();
    const electronics = await Category.findOne({ name: 'Electronics' });
    
    if (electronics) {
      // Update products one by one
      for (const product of products) {
        if (typeof product.category === 'string' && product.category === 'Electronics') {
          await Product.updateOne(
            { _id: product._id },
            { $set: { category: electronics._id } }
          );
        }
      }
      console.log('Products updated with Electronics category');
    }
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateProducts();