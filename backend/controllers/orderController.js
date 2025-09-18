import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Update product stock
  for (let item of orderItems) {
    const product = await Product.findById(item._id);
    if (product) {
      product.countInStock -= item.qty;
      await product.save();
    }
  }

  // Transform cart items to order items format
  const transformedOrderItems = orderItems.map(item => ({
    name: item.name,
    qty: item.qty,
    image: item.image,
    price: item.price,
    product: item._id
  }));

  const order = new Order({
    orderItems: transformedOrderItems,
    user: req.user._id,
    shippingAddress: {
      address: 'Default Address',
      city: 'Default City',
      postalCode: '12345',
      country: 'Default Country'
    },
    paymentMethod: 'Cash on Delivery',
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export { createOrder, getUserOrders };