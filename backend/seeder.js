import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const products = [
  {
    user: new mongoose.Types.ObjectId(),
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
    user: new mongoose.Types.ObjectId(),
    name: 'iPhone 14 Pro 256GB Memory',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    description: 'Introducing the iPhone 14 Pro. A transformative triple-camera system',
    brand: 'Apple',
    category: 'Electronics',
    price: 999.99,
    countInStock: 15,
    rating: 4.8,
    numReviews: 25,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Canon EOS R5 Mirrorless Camera',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
    description: 'Professional mirrorless camera with 45MP full-frame sensor',
    brand: 'Canon',
    category: 'Electronics',
    price: 1299.99,
    countInStock: 8,
    rating: 4.7,
    numReviews: 18,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Sony PlayStation 5 Console',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
    description: 'Next-generation gaming console with ultra-high speed SSD',
    brand: 'Sony',
    category: 'Electronics',
    price: 499.99,
    countInStock: 12,
    rating: 4.9,
    numReviews: 45,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'MacBook Pro 16-inch M2',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    description: 'Supercharged by M2 Pro or M2 Max chip for demanding workflows',
    brand: 'Apple',
    category: 'Electronics',
    price: 2499.99,
    countInStock: 6,
    rating: 4.8,
    numReviews: 32,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Samsung Galaxy Watch 5',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: 'Advanced smartwatch with health monitoring and GPS',
    brand: 'Samsung',
    category: 'Electronics',
    price: 279.99,
    countInStock: 20,
    rating: 4.4,
    numReviews: 28,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Nike Air Max 270',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    description: 'Comfortable running shoes with Max Air cushioning',
    brand: 'Nike',
    category: 'Shoes',
    price: 149.99,
    countInStock: 25,
    rating: 4.3,
    numReviews: 67,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Adidas Ultraboost 22',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    description: 'Premium running shoes with Boost midsole technology',
    brand: 'Adidas',
    category: 'Shoes',
    price: 189.99,
    countInStock: 18,
    rating: 4.6,
    numReviews: 43,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Levi\'s 501 Original Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    description: 'Classic straight-leg jeans with authentic fit and feel',
    brand: 'Levi\'s',
    category: 'Clothing',
    price: 79.99,
    countInStock: 30,
    rating: 4.2,
    numReviews: 89,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Ray-Ban Aviator Sunglasses',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    description: 'Classic aviator sunglasses with UV protection',
    brand: 'Ray-Ban',
    category: 'Accessories',
    price: 154.99,
    countInStock: 22,
    rating: 4.7,
    numReviews: 156,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Bose QuietComfort 45 Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Wireless noise-cancelling headphones with premium sound',
    brand: 'Bose',
    category: 'Electronics',
    price: 329.99,
    countInStock: 14,
    rating: 4.8,
    numReviews: 78,
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Nintendo Switch OLED',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Portable gaming console with vibrant OLED screen',
    brand: 'Nintendo',
    category: 'Electronics',
    price: 349.99,
    countInStock: 16,
    rating: 4.6,
    numReviews: 92,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}