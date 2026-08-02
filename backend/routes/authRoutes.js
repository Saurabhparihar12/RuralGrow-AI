import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authController } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validator.js';

const router = express.Router();
const defaultClientUrl = 'https://rural-grow-ai-eta.vercel.app';
const getClientUrl = () => (process.env.CLIENT_URL || defaultClientUrl).trim().replace(/\/$/, '');

// Public native authentication routes (rate-limited and validated via Zod)
router.post('/signup', authLimiter, validateRequest(registerSchema), authController.register);
router.post('/register', authLimiter, validateRequest(registerSchema), authController.register);
router.post('/login', authLimiter, validateRequest(loginSchema), authController.login);
router.post('/forgot-password', authController.forgotPassword);

// Google OAuth endpoints (triggers passport redirection)
router.get('/google', (req, res, next) => {
  const origin = req.headers.referer || req.headers.origin || getClientUrl();
  const state = Buffer.from(JSON.stringify({ returnTo: origin })).toString('base64');
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account', state })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  let clientUrl = getClientUrl();
  try {
    if (req.query.state) {
      const parsed = JSON.parse(Buffer.from(req.query.state, 'base64').toString('utf-8'));
      if (parsed.returnTo && parsed.returnTo.startsWith('http')) {
        clientUrl = parsed.returnTo.replace(/\/$/, '').replace(/\/login.*$/, '');
      }
    }
  } catch (e) {
    console.error('[OAuth Callback] State parse notice:', e.message);
  }
  
  passport.authenticate('google', { session: false, failureRedirect: `${clientUrl}/login?error=oauth_failed` })(req, res, (err) => {
    if (err || !req.user) {
      console.error('[OAuth Callback] Passport authentication failed:', err ? err.message : 'No user');
      return res.redirect(`${clientUrl}/login?error=oauth_failed`);
    }
    next();
  });
}, (req, res) => {
  let clientUrl = getClientUrl();
  try {
    if (req.query.state) {
      const parsed = JSON.parse(Buffer.from(req.query.state, 'base64').toString('utf-8'));
      if (parsed.returnTo && parsed.returnTo.startsWith('http')) {
        clientUrl = parsed.returnTo.replace(/\/$/, '').replace(/\/login.*$/, '');
      }
    }
  } catch (e) {}

  // Generate JWT token
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
  
  // Redirect back to frontend login callback handler
  res.redirect(`${clientUrl}/login?token=${token}&user=${encodeURIComponent(userStr)}`);
});

// Simulated Google Authentication for sandbox testing without credentials
router.post('/google-simulated', authController.googleSimulated);

// Private/Protected routes
router.route('/profile')
  .get(protect, authController.getProfile)
  .put(protect, authController.updateProfile);

// Admin protected endpoint (accessible by admin/business_owner for testing)
router.get('/admin/stats', protect, authorizeRoles('admin', 'business_owner'), authController.getAdminStats);

export default router;
