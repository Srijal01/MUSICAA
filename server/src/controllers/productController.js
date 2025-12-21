// Product Controller
const Product = require('../models/Product');
const predefinedCategories = require('../config/categories');

// Get all products with optional category filter
const getAllProducts = async (req, res) => {
  try {
    const { main, sub } = req.query;
    let query = {};
    
    if (main && main !== 'all') {
      query['category.main'] = main;
    }
    if (sub && sub !== 'all') {
      query['category.sub'] = sub;
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new product (admin only)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl, cloudinaryId, category, specifications } = req.body;

    // Validation
    if (!name || !description || !price || stock === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      imageUrl: imageUrl || '',
      cloudinaryId: cloudinaryId || '',
      category: category || { main: '', sub: '' },
      specifications: specifications || {},
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product (admin only)
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl, cloudinaryId, category, specifications } = req.body;

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;
    if (cloudinaryId !== undefined) product.cloudinaryId = cloudinaryId;
    if (category !== undefined) product.category = category;
    if (specifications !== undefined) product.specifications = specifications;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get predefined categories
const getCategories = async (req, res) => {
  try {
    res.json(predefinedCategories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
