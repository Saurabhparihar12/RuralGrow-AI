import express from 'express';
import { aiController } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';

const router = express.Router();

// Protected AI operations endpoints (authenticated & rate-limited)
router.post('/chat', protect, authLimiter, aiController.chatAssistant);
router.post('/review-reply', protect, authLimiter, aiController.generateReviewReply);
router.post('/marketing-caption', protect, authLimiter, aiController.generateMarketingCaption);

export default router;
