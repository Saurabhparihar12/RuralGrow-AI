import { z } from 'zod';

// Generic validation helper middleware
export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return details of the validation errors
      return res.status(400).json({
        success: false,
        message: 'Input validation failed.',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    next(error);
  }
};

// User Registration Validation Schema
export const registerSchema = z.object({
  name: z.string({ required_error: 'Name is required' })
         .trim()
         .min(2, 'Name must be at least 2 characters'),
  email: z.string({ required_error: 'Email is required' })
          .trim()
          .lowercase()
          .email('Please provide a valid email address'),
  password: z.string({ required_error: 'Password is required' })
             .min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'farmer', 'business_owner', 'guest']).optional(),
  shopName: z.string().trim().optional()
});

// User Login Validation Schema
export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' })
          .trim()
          .lowercase()
          .email('Please provide a valid email address'),
  password: z.string({ required_error: 'Password is required' })
             .min(1, 'Password cannot be empty')
});
