import express from 'express';
import { captionController } from '../controllers/captionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(captionController.listCaptions)
  .post(protect, captionController.createCaption);

router.route('/:id')
  .delete(protect, captionController.deleteCaption);

export default router;
