// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// A 'route' can handle multiple HTTP methods.
// We chain .post() to the route for the POST request.
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// For the profile, we chain .get() and add our 'protect' middleware.
// The request will first go through protect(), then to getUserProfile().
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser).put(protect, admin, updateUser);

export default router;