const Inquiry = require('../models/Inquiry');

exports.submitInquiry = async (req, res) => {
  const { name, phone, serviceInterested, eventDate, message, peopleCount } = req.body;
  try {
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone number are required' });
    }

    const newInquiry = new Inquiry({
      name,
      phone,
      serviceInterested,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      message,
      peopleCount,
      status: 'new'
    });

    await newInquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting inquiry', error: error.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error: error.message });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  const { status } = req.body;
  try {
    if (!status || !['new', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    inquiry.status = status;
    await inquiry.save();
    res.json(inquiry);
  } catch (error) {
    res.status(400).json({ message: 'Error updating inquiry status', error: error.message });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    await inquiry.deleteOne();
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inquiry', error: error.message });
  }
};
