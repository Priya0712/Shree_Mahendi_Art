const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nameGujarati: { type: String, required: true },   // e.g. "બ્રાઇડલ મહેંદી"
  nameEnglish: { type: String },                      // e.g. "Bridal Mehendi" (optional tag)
  slug: { type: String, required: true, unique: true }, // e.g. "bridal-mehendi"
  order: { type: Number, default: 0 },                // for custom sort in admin
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
