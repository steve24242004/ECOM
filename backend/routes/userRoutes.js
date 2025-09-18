// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // We will create this next

// A 'route' can handle multiple HTTP methods.
// We chain .post() to the route for the POST request.
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// For the profile, we chain .get() and add our 'protect' middleware.
// The request will first go through protect(), then to getUserProfile().
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;