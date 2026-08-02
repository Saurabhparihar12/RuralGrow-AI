import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authController } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validator.js';

const router = express.Router();
const defaultClientUrl = 'https://rural-grow-ai-eta.vercel.app';
const vercelDeploymentUrl = /^https:\/\/rural-grow-[a-z0-9]+-rural-grow-ai\.vercel\.app$/;

const isAllowedClientUrl = (value) => {
  try {
    const origin = new URL(value).origin;
    return origin === defaultClientUrl || vercelDeploymentUrl.test(origin);
  } catch {
    return false;
  }
};

const getClientUrl = () => defaultClientUrl;
const getRequestClientUrl = (request) => {
  const candidate = request.headers.referer || request.headers.origin;
  return isAllowedClientUrl(candidate) ? new URL(candidate).origin : getClientUrl();
};

const getStateClientUrl = (state) => {
  try {
    const parsed = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
    return isAllowedClientUrl(parsed.returnTo) ? new URL(parsed.returnTo).origin : getClientUrl();
  } catch {
    return getClientUrl();
  }
};

// Public native authentication routes (rate-limited and validated via Zod)
router.post('/signup', authLimiter, validateRequest(registerSchema), authController.register);
router.post('/register', authLimiter, validateRequest(registerSchema), authController.register);
router.post('/login', authLimiter, validateRequest(loginSchema), authController.login);
router.post('/forgot-password', authController.forgotPassword);

// Google OAuth endpoints (triggers passport redirection)
router.get('/google', (req, res, next) => {
  const origin = getRequestClientUrl(req);
  const state = Buffer.from(JSON.stringify({ returnTo: origin })).toString('base64');
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account', state })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  const clientUrl = getStateClientUrl(req.query.state);
  
  passport.authenticate('google', { session: false, failureRedirect: `${clientUrl}/login?error=oauth_failed` })(req, res, (err) => {
    if (err || !req.user) {
      console.error('[OAuth Callback] Passport authentication failed:', err ? err.message : 'No user');
      return res.redirect(`${clientUrl}/login?error=oauth_failed`);
    }
    next();
  });
}, (req, res) => {
  const clientUrl = getStateClientUrl(req.query.state);

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
  
  // The fragment is not included in HTTP requests, keeping the short-lived
  // access token out of proxy/server access logs.
  res.redirect(`${clientUrl}/login#token=${token}&user=${encodeURIComponent(userStr)}`);
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
