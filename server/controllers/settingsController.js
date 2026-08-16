const SiteSettings = require('../models/SiteSettings');
const cloudinary = require('../config/cloudinary');

exports.getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving site settings', error: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({});
    if (!settings) settings = new SiteSettings();

    const fields = [
      'ownerName', 'whatsappNumber', 'instagramUrl', 'siteTitle', 'seoDescription',
      'stat1Title', 'stat1Desc', 'stat2Title', 'stat2Desc', 'stat3Title', 'stat3Desc',
      'beforeImage', 'afterImage', 'mehendiImage', 'plainImage'
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) settings[f] = req.body[f];
    });

    await settings.save();
    res.json({ status: 'success', message: 'Settings updated successfully', settings });
  } catch (error) {
    res.status(500).json({ message: 'Error updating site settings', error: error.message });
  }
};

// Upload a slider image (mehendiImage or plainImage) to Cloudinary
exports.uploadSliderImage = async (req, res) => {
  try {
    const { imageData, field } = req.body; // imageData = base64 string
    if (!imageData || !field) {
      return res.status(400).json({ message: 'imageData and field are required' });
    }
    if (!['mehendiImage', 'plainImage'].includes(field)) {
      return res.status(400).json({ message: 'field must be mehendiImage or plainImage' });
    }

    const result = await cloudinary.uploader.upload(imageData, {
      folder: 'shree_mahendi/slider',
      transformation: [{ width: 1200, crop: 'limit', quality: 'auto:good' }]
    });

    let settings = await SiteSettings.findOne({});
    if (!settings) settings = new SiteSettings();
    settings[field] = result.secure_url;
    await settings.save();

    res.json({ status: 'success', url: result.secure_url, field });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};

