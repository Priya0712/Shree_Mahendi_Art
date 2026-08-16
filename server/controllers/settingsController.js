const SiteSettings = require('../models/SiteSettings');

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
    if (!settings) {
      settings = new SiteSettings();
    }
    
    // Copy fields
    const fields = [
      'ownerName', 'whatsappNumber', 'instagramUrl', 'siteTitle', 'seoDescription',
      'stat1Title', 'stat1Desc', 'stat2Title', 'stat2Desc', 'stat3Title', 'stat3Desc',
      'beforeImage', 'afterImage'
    ];
    
    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        settings[f] = req.body[f];
      }
    });

    await settings.save();
    res.json({ status: 'success', message: 'Settings updated successfully', settings });
  } catch (error) {
    res.status(500).json({ message: 'Error updating site settings', error: error.message });
  }
};
