const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  captionGujarati: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  isFeatured: { type: Boolean, default: false }, // show in homepage preview
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
