import express from 'express';
const router = express.Router();
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getUserOrders);

export default router;