const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Service = require('./models/Service');

dotenv.config();

const categoriesData = [
  { nameGujarati: "બ્રાઇડલ મહેંદી", nameEnglish: "Bridal Mehendi", slug: "bridal-mehendi", order: 1 },
  { nameGujarati: "પાર્ટી મહેંદી", nameEnglish: "Party Mehendi", slug: "party-mehendi", order: 2 },
  { nameGujarati: "આર્બિક મહેંદી", nameEnglish: "Arabic Mehendi", slug: "arabic-mehendi", order: 3 },
  { nameGujarati: "नेઇલ આર્ટ", nameEnglish: "Nail Art", slug: "nail-art", order: 4 },
  { nameGujarati: "વેક્સિંગ", nameEnglish: "Waxing", slug: "waxing", order: 5 },
  { nameGujarati: "ખાટલી વર્ક", nameEnglish: "Khatli Work", slug: "khatli-work", order: 6 },
  { nameGujarati: "મહેંદી કોન", nameEnglish: "Mehendi Cones", slug: "mehendi-cones", order: 7 }
];

const servicesData = [
  {
    categorySlug: "bridal-mehendi",
    titleGujarati: "રોયલ બ્રાઇડલ મહેંદી",
    titleEnglish: "Royal Bridal Mehendi",
    descriptionGujarati: "દુલહનના હાથ અને પગ માટે અત્યંત આકર્ષક અને ઝીણવટભરી ડિઝાઇન. પરંપરાગત વર-કન્યા ચિત્ર સાથે.",
    priceNote: "₹૫૦૦૦ થી શરૂ",
    image: {
      url: "/images/hero-bridal-mehendi.jpg",
      publicId: "default_hero_bridal"
    },
    isFeatured: true,
    order: 1
  },
  {
    categorySlug: "bridal-mehendi",
    titleGujarati: "પરંપરાગત સાજી મહેંદી",
    titleEnglish: "Traditional Saji Mehendi",
    descriptionGujarati: "ખાસ મારવાડી અને રાજસ્થાની શૈલીમાં દોરવામાં આવતી ઝીણી મહેંદી જે કલર પકડ્યા પછી અતિ સુંદર લાગે છે.",
    priceNote: "₹૩૫૦૦ થી શરૂ",
    image: {
      url: "/images/after-bridal-mehendi.jpg",
      publicId: "default_after_bridal"
    },
    isFeatured: true,
    order: 2
  },
  {
    categorySlug: "party-mehendi",
    titleGujarati: "ઇન્ડો-વેસ્ટર્ન પાર્ટી મહેંદી",
    titleEnglish: "Indo-Western Party Mehendi",
    descriptionGujarati: "ઝડપી, આધુનિક અને ફેન્સી લુક આપતી કલાત્મક મહેંદી ડિઝાઇન મહેમાનો માટે.",
    priceNote: "₹૫૦0 થી શરૂ",
    image: {
      url: "https://images.unsplash.com/photo-1590075865003-e48277faa558?auto=format&fit=crop&q=80&w=600",
      publicId: "party_mehendi_1"
    },
    isFeatured: true,
    order: 1
  },
  {
    categorySlug: "arabic-mehendi",
    titleGujarati: "દુબઈ સ્ટાઈલ અરેબિક મહેંદી",
    titleEnglish: "Dubai Style Arabic Mehendi",
    descriptionGujarati: "ઘટ્ટ બ્લેક અને બ્રાઉન શેડિંગ સાથે હાથ પર સુંદર વેલ અને ફ્લાવર આર્ટ વાળી અરેબિક ડિઝાઇન.",
    priceNote: "₹૭૦૦ થી શરૂ",
    image: {
      url: "https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?auto=format&fit=crop&q=80&w=600",
      publicId: "arabic_mehendi_1"
    },
    isFeatured: true,
    order: 1
  },
  {
    categorySlug: "nail-art",
    titleGujarati: "જેલ નેઇલ એક્સટેન્શન",
    titleEnglish: "Gel Nail Extensions",
    descriptionGujarati: "લાંબા સમય સુધી ટકી રહે તેવા પ્રીમિયમ નેઇલ એક્સટેન્શન અને ગ્લોસી ફિનિશિંગ જેલ નેઇલ આર્ટ.",
    priceNote: "₹૧૫૦૦ થી શરૂ",
    image: {
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
      publicId: "nail_art_1"
    },
    isFeatured: true,
    order: 1
  },
  {
    categorySlug: "nail-art",
    titleGujarati: "થ્રીડી ગ્લિટર અને સ્ટોન નેઇલ આર્ટ",
    titleEnglish: "3D Glitter & Stone Nail Art",
    descriptionGujarati: "ખાસ લગ્ન અને તહેવારોના પ્રસંગો માટે ગ્લિટર વર્ક અને મલ્ટીકલર આર્ટ નેઇલ ડિઝાઇન.",
    priceNote: "₹૮૦૦ થી શરૂ",
    image: {
      url: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=600",
      publicId: "nail_art_2"
    },
    isFeatured: false,
    order: 2
  },
  {
    categorySlug: "waxing",
    titleGujarati: "હાથ અને પગ માટે હની વેક્સિંગ",
    titleEnglish: "Honey Waxing (Hands & Legs)",
    descriptionGujarati: "ત્વચાના ટેનિંગને દૂર કરી તેને સોફ્ટ અને મુલાયમ બનાવતી હાઇજેનિક વેક્સિંગ સેવા.",
    priceNote: "₹૬૦૦ થી શરૂ",
    image: {
      url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
      publicId: "waxing_1"
    },
    isFeatured: false,
    order: 1
  },
  {
    categorySlug: "khatli-work",
    titleGujarati: "હેન્ડક્રાફ્ટેડ ખાટલી ભરતકામ",
    titleEnglish: "Handcrafted Khatli Embroidery",
    descriptionGujarati: "બ્લાઉઝ, કુર્તી અને ચોલી માટે પ્રખ્યાત ટ્રેડિશનલ ખાટલી વર્ક અને મોતી-ઝરીનું કલાત્મક કોતરણીકામ.",
    priceNote: "₹૧૫૦૦ થી શરૂ",
    image: {
      url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
      publicId: "khatli_1"
    },
    isFeatured: false,
    order: 1
  },
  {
    categorySlug: "mehendi-cones",
    titleGujarati: "શ્રી ઓર્ગેનિક મહેંદી કોન (બોક્સ)",
    titleEnglish: "Shree Organic Cone Box",
    descriptionGujarati: "૧૦૦% નેચરલ પાન, ફિલ્ટર કરેલ પાવડર અને યુકેલિપ્ટસ ઓઇલમાંથી બનાવેલ ૧૨ કોનનું આખું બોક્સ.",
    priceNote: "₹૨૪૦ પ્રતિ બોક્સ",
    image: {
      url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
      publicId: "cone_1"
    },
    isFeatured: true,
    order: 1
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await Category.deleteMany({});
    await Service.deleteMany({});
    console.log('Cleared existing categories and services.');

    // Insert categories
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`Seeded ${createdCategories.length} categories.`);

    // Map category ID to its slug
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Populate service categories IDs
    const preparedServices = servicesData.map(svc => {
      const categoryId = categoryMap[svc.categorySlug];
      if (!categoryId) {
        throw new Error(`Category ID not found for slug: ${svc.categorySlug}`);
      }
      return {
        titleGujarati: svc.titleGujarati,
        titleEnglish: svc.titleEnglish,
        descriptionGujarati: svc.descriptionGujarati,
        category: categoryId,
        priceNote: svc.priceNote,
        image: svc.image,
        isFeatured: svc.isFeatured,
        order: svc.order
      };
    });

    const createdServices = await Service.insertMany(preparedServices);
    console.log(`Seeded ${createdServices.length} services.`);

    console.log('Database Seeding Successful! Exiting...');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
