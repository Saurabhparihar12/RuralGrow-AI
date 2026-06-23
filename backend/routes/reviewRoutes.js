import express from 'express';
import { reviewController } from '../controllers/reviewController.js';

const router = express.Router();

// CRUD operations on reviews
router.route('/')
  .get(reviewController.listReviews)
  .post(reviewController.createReview);

router.route('/:id')
  .get(reviewController.getReviewById)
  .put(reviewController.updateReview)
  .delete(reviewController.deleteReview);

// Additional endpoint for reply suggestions
router.route('/:id/reply')
  .post(reviewController.generateReplySuggestion);

export default router;
