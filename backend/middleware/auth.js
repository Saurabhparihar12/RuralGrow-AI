import jwt from 'jsonwebtoken';
import { userService } from '../data/dbHelper.js';

export const protect = async (req, res, next) => {
  let token;

  // Check for Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ruralgrow_secret_key');

      // Find user in database/JSON fallback
      const user = await userService.findUserById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: User no longer exists.'
        });
      }

      // Attach user details to request
      req.user = {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        shopName: user.shopName
      };

      next();
    } catch (error) {
      console.error('[Auth Middleware] Verification error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Invalid token.'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: Token missing.'
    });
  }
};
