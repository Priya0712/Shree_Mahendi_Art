const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res) => {
  try {
    const filter = {};
    if (!req.headers.authorization) {
      filter.isApproved = true;
    }
    const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
};

exports.createTestimonial = async (req, res) => {
  const { customerName, messageGujarati, rating, image, isApproved, order } = req.body;
  try {
    const newTestimonial = new Testimonial({
      customerName,
      messageGujarati,
      rating: rating ? parseInt(rating) : 5,
      image,
      isApproved: isApproved !== undefined ? (isApproved === 'true' || isApproved === true) : true,
      order: order ? parseInt(order) : 0
    });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error creating testimonial', error: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  const { customerName, messageGujarati, rating, image, isApproved, order } = req.body;
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (customerName) testimonial.customerName = customerName;
    if (messageGujarati) testimonial.messageGujarati = messageGujarati;
    if (rating !== undefined) testimonial.rating = parseInt(rating);
    if (image !== undefined) testimonial.image = image;
    if (isApproved !== undefined) testimonial.isApproved = isApproved === 'true' || isApproved === true;
    if (order !== undefined) testimonial.order = parseInt(order);

    await testimonial.save();
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error updating testimonial', error: error.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    await testimonial.deleteOne();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
  }
};
