// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Assuming your db connection is here
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // We'll create this

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // Allows us to accept JSON data in the body

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount the user routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Custom error handling middleware (should be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);