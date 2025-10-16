import express from 'express';
const router = express.Router();
import { createOrder, getUserOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;