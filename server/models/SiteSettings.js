const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  ownerName: { type: String, default: 'પ્રિયાબેન કોશિયા' },
  whatsappNumber: { type: String, default: '8799008221' },
  instagramUrl: { type: String, default: 'https://instagram.com/shree_mahendi_art' },
  siteTitle: { type: String, default: 'શ્રી મહેંદી' },
  seoDescription: { type: String, default: 'શ્રી મહેંદી - બ્રાઇડલ મહેંદી, સાઇડર મહેંદી, નેઇલ આર્ટ, વેક્સિંગ અને ખાટલી વર્ક માટે વિશ્વસનીય નામ.' },
  
  // Trust Stats
  stat1Title: { type: String, default: '૫+ વર્ષનો અનુભવ' },
  stat1Desc: { type: String, default: 'બ્રાઇડલ અને પાર્ટી મહેંદીમાં નિપુણતા' },
  stat2Title: { type: String, default: '૩૦૦+ ગ્રાહકો' },
  stat2Desc: { type: String, default: 'દરેક ડિઝાઈનમાં વ્યક્તિગત ધ્યાન' },
  stat3Title: { type: String, default: 'બધા પ્રકારની સેવા' },
  stat3Desc: { type: String, default: 'મહેંદી, નેઇલ આર્ટ, વેક્સિંગ, ખાટલી વર્ક' },

  // Before/After Image urls
  beforeImage: { type: String, default: '/images/before-plain-hand.jpg' },
  afterImage: { type: String, default: '/images/after-bridal-mehendi.jpg' }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
