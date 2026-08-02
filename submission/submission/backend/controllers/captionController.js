import { reviewService } from '../data/dbHelper.js';

export const captionController = {
  // 1. GET /api/captions
  async listCaptions(req, res, next) {
    try {
      const captions = await reviewService.listCaptions();
      res.status(200).json({
        success: true,
        count: captions.length,
        data: captions
      });
    } catch (error) {
      next(error);
    }
  },

  // 2. POST /api/captions
  async createCaption(req, res, next) {
    try {
            const { productName, shopType, captionText, reviewId } = req.body;
      if (!productName || !shopType || !captionText) {
        return res.status(400).json({
          success: false,
          message: 'Please provide productName, shopType, and captionText.'
        });
      }

      const caption = await reviewService.createCaption({
        productName,
        shopType,
        captionText,
        reviewId: reviewId || null
      });

      res.status(201).json({
        success: true,
        data: caption
      });
    } catch (error) {
      next(error);
    }
  },

  // 3. DELETE /api/captions/:id
  async deleteCaption(req, res, next) {
    try {
      const deleted = await reviewService.deleteCaption(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Caption not found with id: ${req.params.id}`
        });
      }
      res.status(200).json({
        success: true,
        message: 'Caption successfully deleted',
        data: deleted
      });
    } catch (error) {
      next(error);
    }
  },

  // 4. PUT /api/captions/:id
  async updateCaption(req, res, next) {
    try {
      const { captionText } = req.body;
      if (!captionText) {
        return res.status(400).json({
          success: false,
          message: 'Please provide captionText.'
        });
      }

      const updated = await reviewService.updateCaption(req.params.id, { captionText });
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: `Caption not found with id: ${req.params.id}`
        });
      }

      res.status(200).json({
        success: true,
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }
};
