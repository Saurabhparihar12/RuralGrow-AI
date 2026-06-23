import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import reviewRoutes from './routes/reviewRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { setMongoConnected } from './data/dbHelper.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser middleware
app.use(cors());
app.use(express.json());

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

// REST routes
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
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
app.listen(PORT, () => {
  console.log(`[Server] REST API successfully listening on port: ${PORT}`);
});
