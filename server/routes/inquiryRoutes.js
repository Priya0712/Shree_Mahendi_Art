const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const protect = require('../middleware/auth');

router.post('/', inquiryController.submitInquiry);
router.get('/', protect, inquiryController.getInquiries);
router.put('/:id/status', protect, inquiryController.updateInquiryStatus);
router.delete('/:id', protect, inquiryController.deleteInquiry);

module.exports = router;
