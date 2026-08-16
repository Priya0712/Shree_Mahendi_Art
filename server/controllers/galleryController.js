const GalleryImage = require('../models/GalleryImage');
const Category = require('../models/Category');
const cloudinary = require('../config/cloudinary');

exports.getGallery = async (req, res) => {
  const { category, featured } = req.query;
  try {
    const filter = {};

    if (featured) {
      filter.isFeatured = featured === 'true';
    }

    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        filter.category = cat._id;
      } else {
        return res.json([]);
      }
    }

    const images = await GalleryImage.find(filter)
      .populate('category')
      .sort({ order: 1, createdAt: -1 });

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery images', error: error.message });
  }
};

exports.uploadGalleryImage = async (req, res) => {
  const { captionGujarati, category, isFeatured, order } = req.body;
  try {
    // Multi-upload check
    if (req.files && req.files.length > 0) {
      const createdImages = [];
      for (const file of req.files) {
        const newImg = await GalleryImage.create({
          captionGujarati,
          category,
          image: { url: file.path, publicId: file.filename },
          isFeatured: isFeatured === 'true' || isFeatured === true,
          order: order ? parseInt(order) : 0
        });
        createdImages.push(newImg);
      }
      return res.status(201).json(createdImages);
    }

    // Single-upload fallback
    if (req.file) {
      const newImg = await GalleryImage.create({
        captionGujarati,
        category,
        image: { url: req.file.path, publicId: req.file.filename },
        isFeatured: isFeatured === 'true' || isFeatured === true,
        order: order ? parseInt(order) : 0
      });
      return res.status(201).json(newImg);
    }

    return res.status(400).json({ message: 'No image file uploaded' });
  } catch (error) {
    res.status(400).json({ message: 'Error uploading gallery image', error: error.message });
  }
};

exports.updateGalleryImage = async (req, res) => {
  const { captionGujarati, category, isFeatured, order } = req.body;
  try {
    const img = await GalleryImage.findById(req.params.id);
    if (!img) return res.status(404).json({ message: 'Image not found' });

    if (captionGujarati !== undefined) img.captionGujarati = captionGujarati;
    if (category) img.category = category;
    if (isFeatured !== undefined) img.isFeatured = isFeatured === 'true' || isFeatured === true;
    if (order !== undefined) img.order = parseInt(order);

    await img.save();
    res.json(img);
  } catch (error) {
    res.status(400).json({ message: 'Error updating gallery image', error: error.message });
  }
};

exports.deleteGalleryImage = async (req, res) => {
  try {
    const img = await GalleryImage.findById(req.params.id);
    if (!img) return res.status(404).json({ message: 'Image not found' });

    if (img.image && img.image.publicId) {
      await cloudinary.uploader.destroy(img.image.publicId);
    }

    await img.deleteOne();
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery image', error: error.message });
  }
};
