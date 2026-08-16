const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  titleGujarati: { type: String, required: true },
  titleEnglish: { type: String },
  descriptionGujarati: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  priceNote: { type: String },   // e.g. "₹2000 થી શરૂ" or "Contact for price"
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true }, // Cloudinary public_id for deletion
  },
  isFeatured: { type: Boolean, default: false }, // show on homepage
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
