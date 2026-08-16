const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', galleryController.getGallery);

// Supports both single file upload under field 'image' and multi-upload under field 'images'
router.post(
  '/',
  protect,
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 12 }]),
  (req, res, next) => {
    if (req.files) {
      if (req.files.image) {
        req.file = req.files.image[0];
      }
      if (req.files.images) {
        req.files = req.files.images;
      }
    }
    next();
  },
  galleryController.uploadGalleryImage
);

router.put('/:id', protect, galleryController.updateGalleryImage);
router.delete('/:id', protect, galleryController.deleteGalleryImage);

module.exports = router;
