import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/categoryModel.js';
import connectDB from './config/db.js';
import slugify from 'slugify';

dotenv.config();
connectDB();

const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Home & Garden' }
];

const seedCategories = async () => {
  try {
    await Category.deleteMany();
    
    const createdCategories = await Category.insertMany(
      categories.map(cat => ({
        ...cat,
        slug: slugify(cat.name, { lower: true })
      }))
    );
    
    console.log('Categories seeded:', createdCategories);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCategories();