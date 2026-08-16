const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const filter = {};
    // If not admin, only show active categories
    if (!req.headers.authorization) {
      filter.isActive = true;
    }
    const categories = await Category.find(filter).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { nameGujarati, nameEnglish, slug, order, isActive } = req.body;
  try {
    const newCategory = new Category({
      nameGujarati,
      nameEnglish,
      slug,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { nameGujarati, nameEnglish, slug, order, isActive } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (nameGujarati) category.nameGujarati = nameGujarati;
    if (nameEnglish !== undefined) category.nameEnglish = nameEnglish;
    if (slug) category.slug = slug;
    if (order !== undefined) category.order = order;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
