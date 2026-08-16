const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const protect = require('../middleware/auth');

router.get('/', testimonialController.getTestimonials);
router.post('/', protect, testimonialController.createTestimonial);
router.put('/:id', protect, testimonialController.updateTestimonial);
router.delete('/:id', protect, testimonialController.deleteTestimonial);

module.exports = router;
