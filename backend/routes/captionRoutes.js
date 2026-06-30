import express from 'express';
import { captionController } from '../controllers/captionController.js';

const router = express.Router();

router.route('/')
  .get(captionController.listCaptions)
  .post(captionController.createCaption);

router.route('/:id')
  .delete(captionController.deleteCaption);

export default router;
