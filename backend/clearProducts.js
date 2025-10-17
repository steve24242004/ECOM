import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const clearProducts = async () => {
  try {
    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

clearProducts();