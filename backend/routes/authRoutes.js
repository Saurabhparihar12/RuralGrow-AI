import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authController } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validator.js';

const router = express.Router();

// Public native authentication routes (rate-limited and validated via Zod)
router.post('/signup', authLimiter, validateRequest(registerSchema), authController.register);
router.post('/register', authLimiter, validateRequest(registerSchema), authController.register);
router.post('/login', authLimiter, validateRequest(loginSchema), authController.login);
router.post('/forgot-password', authController.forgotPassword);

// Google OAuth endpoints (triggers passport redirection)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }),
  (req, res) => {
    // Generate token
    const token = jwt.sign({ id: req.user.id || req.user._id }, process.env.JWT_SECRET || 'ruralgrow_secret_key', {
      expiresIn: '7d'
    });
    
    // User metadata payload
    const userStr = JSON.stringify({
      id: req.user.id || req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      shopName: req.user.shopName,
      googleId: req.user.googleId,
      avatar: req.user.avatar
    });
    
    // Redirect to frontend callback handler
    res.redirect(`http://localhost:5173/login?token=${token}&user=${encodeURIComponent(userStr)}`);
  }
);

// Simulated Google Authentication for sandbox testing without credentials
router.post('/google-simulated', authController.googleSimulated);

// Private/Protected routes
router.route('/profile')
  .get(protect, authController.getProfile)
  .put(protect, authController.updateProfile);

// Admin protected endpoint (accessible by admin/business_owner for testing)
router.get('/admin/stats', protect, authorizeRoles('admin', 'business_owner'), authController.getAdminStats);

export default router;
