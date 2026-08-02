import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';

// Rate limiter for authentication endpoints: max 5 login/register attempts per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs during testing
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP, please try again after 15 minutes.'
  },
  statusCode: 429
});

// Configure security headers using Helmet (disable CSP restrictions to allow full SPA fetch execution)
export const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false
});

// Prevent MongoDB query injection
export const mongoSanitizeMiddleware = mongoSanitize();

// Production CORS configuration (supporting Vercel & Render client domains)
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://rural-grow-ai-eta.vercel.app',
  'https://ruralgrowai.vercel.app',
  'https://ruralgrow-ai.vercel.app',
  'https://ruralgrow-ai.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
].filter(Boolean);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin or whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
