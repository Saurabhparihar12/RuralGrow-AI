import jwt from 'jsonwebtoken';
import { userService } from '../data/dbHelper.js';

// Helper to sign JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'ruralgrow_secret_key', {
    expiresIn: '30d'
  });
};

export const authController = {
  // 1. POST /api/auth/signup - Register new account
  async signup(req, res, next) {
    try {
      const { name, email, password, role, shopName } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, email, and password.'
        });
      }

      // Check if user already exists
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      // Create new user
      const user = await userService.createUser({
        name,
        email,
        password,
        role: role || 'merchant',
        shopName: shopName || 'Garhwal Organic Farms'
      });

      // Generate token
      const token = signToken(user.id || user._id);

      res.status(201).json({
        success: true,
        message: 'Account created successfully.',
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

  // 2. POST /api/auth/login - User login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password.'
        });
      }

      // Check if user exists
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      // Check password
      const isMatch = await userService.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      // Generate token
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
      // req.user has been attached by the protect middleware
      res.status(200).json({
        success: true,
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  },

  // 4. POST /api/auth/forgot-password - Simulate password recovery trigger
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

      // In production, send a secure recovery email. We simulate success here.
      res.status(200).json({
        success: true,
        message: 'Password recovery verification link sent to your registered email.'
      });
    } catch (error) {
      next(error);
    }
  }
};
