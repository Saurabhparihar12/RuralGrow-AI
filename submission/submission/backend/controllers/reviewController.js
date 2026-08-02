import { reviewService } from '../data/dbHelper.js';

// Simple helper to detect sentiment from review text
function detectSentiment(text = '') {
  const lowerText = text.toLowerCase();
  const positiveWords = ['good', 'nice', 'best', 'amazing', 'beautiful', 'great', 'wonderful', 'happy', 'love', 'pure', 'delicious', 'fresh'];
  const negativeWords = ['bad', 'delay', 'late', 'slow', 'poor', 'worst', 'broken', 'expensive', 'sorry', 'disappointed', 'terrible'];

  let score = 0;
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) score -= 1;
  });

  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

// Helper to generate default reply templates
function generateReplyTemplate(author, shopName, sentiment) {
  const name = author.split(' ')[0] || 'Customer';
  if (sentiment === 'positive') {
    return `Hi ${name}! Thank you so much for the 5-star review. We are so happy you liked your experience at ${shopName}. Do let us know when you need your next order. Have a wonderful day! 🙏`;
  } else if (sentiment === 'negative') {
    return `Hello ${name}, thank you for your feedback. We are really sorry that your experience at ${shopName} did not meet your expectations. We are taking this seriously and will improve our service. Please message us directly so we can make this right. 🙏`;
  } else {
    return `Hi ${name}! Thank you for the review. We are glad you checked out ${shopName} and appreciate your honest feedback. We will keep working to make our products better. Hope to serve you again! 🙏`;
  }
}

export const reviewController = {
  // 1. GET List (supports search and sentiment filtering)
  async listReviews(req, res, next) {
    try {
      const { search, sentiment } = req.query;
      const reviews = await reviewService.listReviews(search, sentiment);
      res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews
      });
    } catch (error) {
      next(error);
    }
  },

  // 2. GET Single Review
  async getReviewById(req, res, next) {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: `Review not found with id: ${req.params.id}`
        });
      }
      res.status(200).json({
        success: true,
        data: review
      });
    } catch (error) {
      next(error);
    }
  },

  // 3. POST Create Review
  async createReview(req, res, next) {
    try {
      const { author, shopName, rating, reviewText } = req.body;

      if (!author || !shopName || !rating || !reviewText) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields: author, shopName, rating, and reviewText.'
        });
      }

      // Auto analyze sentiment and reply template
      const sentiment = detectSentiment(reviewText);
      const replySuggestion = generateReplyTemplate(author, shopName, sentiment);

      const review = await reviewService.createReview({
        author,
        shopName,
        rating: Number(rating),
        reviewText,
        sentiment,
        replySuggestion
      });

      res.status(201).json({
        success: true,
        data: review
      });
    } catch (error) {
      next(error);
    }
  },

  // 4. PUT Update Review
  async updateReview(req, res, next) {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: `Review not found with id: ${req.params.id}`
        });
      }

      const updated = await reviewService.updateReview(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: updated
      });
    } catch (error) {
      next(error);
    }
  },

  // 5. DELETE Review
  async deleteReview(req, res, next) {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: `Review not found with id: ${req.params.id}`
        });
      }

      await reviewService.deleteReview(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Review successfully deleted',
        data: review
      });
    } catch (error) {
      next(error);
    }
  },

  // 6. Additional Endpoint: POST /api/reviews/:id/reply
  // Manually re-trigger AI/Mock sentiment analysis and custom reply generation
  async generateReplySuggestion(req, res, next) {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: `Review not found with id: ${req.params.id}`
        });
      }

      const sentiment = detectSentiment(review.reviewText);
      const replySuggestion = generateReplyTemplate(review.author, review.shopName, sentiment);

      const updated = await reviewService.updateReview(req.params.id, {
        sentiment,
        replySuggestion
      });

      res.status(200).json({
        success: true,
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }
};
