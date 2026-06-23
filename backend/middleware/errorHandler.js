/**
 * Catch-all global error handling middleware.
 * Formats errors as unified JSON payloads and responds with correct HTTP codes.
 */
export default function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error Middleware] Status: ${statusCode} | Message: ${message}`);
  if (err.stack && process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
}
