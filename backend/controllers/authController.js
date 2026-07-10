import jwt from 'jsonwebtoken';
import { userService, reviewService } from '../data/dbHelper.js';

// Helper to sign JWT token (expires in 7 days as requested)
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'ruralgrow_secret_key', {
    expiresIn: '7d'
  });
};

export const authController = {
  // 1. POST /api/auth/register (or /signup) - Create new account
  async register(req, res, next) {
    try {
      const { name, email, password, role, shopName } = req.body;

      // Check if user already exists
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      // Create new user (role defaults to guest if not provided)
      const user = await userService.createUser({
        name,
        email,
        password,
        role: role || 'guest',
        shopName: shopName || 'Garhwal Organic Farms'
      });

      // Generate signed JWT
      const token = signToken(user.id || user._id);

      res.status(201).json({
        success: true,
        message: 'Account registered successfully.',
        token,
        user: {
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          shopName: user.shopName
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // 2. POST /api/auth/login - User login validation
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      // Verify hashed password
      const isMatch = await userService.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      // Generate signed JWT
      const token = signToken(user.id || user._id);

      res.status(200).json({
        success: true,
        message: 'Login successful.',
        token,
        user: {
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          shopName: user.shopName
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // 3. GET /api/auth/profile - Fetch authenticated user details
  async getProfile(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  },

  // 4. POST /api/auth/forgot-password - Simulated recovery trigger
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Please provide your email address.'
        });
      }

      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'No account found with this email address.'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Verification reset link has been dispatched to your email.'
      });
    } catch (error) {
      next(error);
    }
  },

  // 5. POST /api/auth/google-simulated - Simulated Google Login for local testing
  async googleSimulated(req, res, next) {
    try {
      const { name, email, avatar } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email parameter is required for Google login.'
        });
      }

      // Search or create user
      let user = await userService.findUserByEmail(email);
      
      if (!user) {
        // Create user with simulated Google parameters
        user = await userService.createUser({
          name: name || 'Google User',
          email,
          role: 'guest', // default role
          googleId: `google-simulated-${Date.now()}`,
          avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          shopName: 'Garhwal Farms (Google)'
        });
      } else if (!user.googleId) {
        // Link googleId to existing native account
        user.googleId = `google-simulated-${Date.now()}`;
        if (avatar) user.avatar = avatar;
      }

      // Sign JWT
      const token = signToken(user.id || user._id);

      res.status(200).json({
        success: true,
        message: 'Google login successful (Simulated Mode).',
        token,
        user: {
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          shopName: user.shopName,
          googleId: user.googleId,
          avatar: user.avatar
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // 6. GET /api/auth/admin/stats - Admin Dashboard Telemetry
  async getAdminStats(req, res, next) {
    try {
      // Accessing model list metrics
      const reviews = await reviewService.listReviews();
      const captions = await reviewService.listCaptions();
      
      // Calculate sentiment aggregates
      const positiveCount = reviews.filter(r => r.sentiment === 'positive').length;
      const neutralCount = reviews.filter(r => r.sentiment === 'neutral').length;
      const negativeCount = reviews.filter(r => r.sentiment === 'negative').length;

      res.status(200).json({
        success: true,
        stats: {
          totalUsers: 14, // Simulated user base metrics
          totalReviews: reviews.length,
          totalCaptions: captions.length,
          sentimentRatio: {
            positive: positiveCount,
            neutral: neutralCount,
            negative: negativeCount
          },
          serverUptime: process.uptime(),
          dbStatus: 'Connected',
          memoryUsage: process.memoryUsage().heapUsed
        }
      });
    } catch (error) {
      next(error);
    }
  }
};
