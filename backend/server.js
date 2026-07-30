import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { configurePassport } from './config/passport.js';
import { helmetMiddleware, mongoSanitizeMiddleware, corsMiddleware } from './middleware/security.js';
import reviewRoutes from './routes/reviewRoutes.js';
import captionRoutes from './routes/captionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { setMongoConnected } from './data/dbHelper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables dynamically using absolute path
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Mount Security and CORS Middlewares
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(mongoSanitizeMiddleware);
app.use(express.json());

// Initialize Passport configurations
configurePassport();
app.use(passport.initialize());

// Database setup: attempt MongoDB connection, fallback to local JSON file
const mongoURI = process.env.MONGODB_URI;

if (mongoURI) {
  console.log('[Database] Connecting to MongoDB at:', mongoURI);
  mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 3000
  })
  .then(() => {
    console.log('[Database] Successfully connected to MongoDB.');
    setMongoConnected(true);
  })
  .catch((err) => {
    console.error('[Database] MongoDB connection failed. Error:', err.message);
    console.log('[Database] Falling back to local JSON database storage mode.');
    setMongoConnected(false);
  });
} else {
  console.log('[Database] No MONGODB_URI environment variable detected.');
  console.log('[Database] Initializing in local JSON database storage mode.');
  setMongoConnected(false);
}

// REST API routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/captions', captionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Serve static frontend React SPA build if available
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  console.log('[Server] Mounting frontend static production build from:', frontendDistPath);
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  // Root API welcome endpoint
  app.get('/', (req, res) => {
    res.status(200).json({
      name: 'RuralGrow AI REST API',
      status: 'online',
      version: '1.0.0',
      healthCheck: '/api/health',
      documentation: 'https://github.com/Saurabhparihar12/RuralGrow-AI'
    });
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime())
  });
});

// Fallback for undefined routes
app.use('*', (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Catch-all global error handling middleware
app.use(errorHandler);

// Start listening for API requests
const server = app.listen(PORT, () => {
  console.log(`[Server] REST API successfully listening on port: ${PORT}`);
});

// Graceful shutdown handling for production orchestrators (Render / Railway)
const shutdownGracefully = (signal) => {
  console.log(`[Server] Received ${signal}. Closing HTTP server gracefully...`);
  server.close(() => {
    console.log('[Server] HTTP server closed.');
    mongoose.connection.close(false).then(() => {
      console.log('[Database] MongoDB connection closed.');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', () => shutdownGracefully('SIGTERM'));
process.on('SIGINT', () => shutdownGracefully('SIGINT'));

