import express from 'express';
import { reviewController } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// CRUD operations on reviews
router.route('/')
  .get(reviewController.listReviews)
  .post(protect, reviewController.createReview);

router.route('/:id')
  .get(reviewController.getReviewById)
  .put(protect, reviewController.updateReview)
  .delete(protect, reviewController.deleteReview);

// Additional endpoint for reply suggestions
router.route('/:id/reply')
  .post(protect, reviewController.generateReplySuggestion);

export default router;
