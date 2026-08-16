const Service = require('../models/Service');
const Category = require('../models/Category');
const cloudinary = require('../config/cloudinary');

exports.getServices = async (req, res) => {
  const { category, featured } = req.query;
  try {
    const filter = {};
    
    // Public filter: only active services
    if (!req.headers.authorization) {
      filter.isActive = true;
    }

    if (featured) {
      filter.isFeatured = featured === 'true';
    }

    if (category) {
      // Find category by slug first
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        filter.category = cat._id;
      } else {
        // If category is provided but not found, return empty array
        return res.json([]);
      }
    }

    const services = await Service.find(filter)
      .populate('category')
      .sort({ order: 1, createdAt: -1 });

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('category');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service detail', error: error.message });
  }
};

exports.createService = async (req, res) => {
  const { titleGujarati, titleEnglish, descriptionGujarati, category, priceNote, isFeatured, order, isActive } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Service image is required' });
    }

    const newService = new Service({
      titleGujarati,
      titleEnglish,
      descriptionGujarati,
      category,
      priceNote,
      image: {
        url: req.file.path,
        publicId: req.file.filename
      },
      isFeatured: isFeatured === 'true' || isFeatured === true,
      order: order ? parseInt(order) : 0,
      isActive: isActive === undefined ? true : (isActive === 'true' || isActive === true)
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: 'Error creating service', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  const { titleGujarati, titleEnglish, descriptionGujarati, category, priceNote, isFeatured, order, isActive } = req.body;
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (titleGujarati) service.titleGujarati = titleGujarati;
    if (titleEnglish !== undefined) service.titleEnglish = titleEnglish;
    if (descriptionGujarati) service.descriptionGujarati = descriptionGujarati;
    if (category) service.category = category;
    if (priceNote !== undefined) service.priceNote = priceNote;
    if (isFeatured !== undefined) service.isFeatured = isFeatured === 'true' || isFeatured === true;
    if (order !== undefined) service.order = parseInt(order);
    if (isActive !== undefined) service.isActive = isActive === 'true' || isActive === true;

    // If new image file is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (service.image && service.image.publicId) {
        await cloudinary.uploader.destroy(service.image.publicId);
      }
      service.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    await service.save();
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: 'Error updating service', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Delete image from Cloudinary
    if (service.image && service.image.publicId) {
      await cloudinary.uploader.destroy(service.image.publicId);
    }

    await service.deleteOne();
    res.json({ message: 'Service and associated image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};
