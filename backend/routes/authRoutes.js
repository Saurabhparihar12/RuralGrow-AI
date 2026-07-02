import express from 'express';
import { authController } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

// Private/Protected routes
router.get('/profile', protect, authController.getProfile);

export default router;
