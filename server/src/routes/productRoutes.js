// Product Routes
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// GET /api/products/categories (must be before /:id)
router.get('/categories', productController.getCategories);

// GET /api/products
router.get('/', productController.getAllProducts);

// GET /api/products/:id
router.get('/:id', productController.getProductById);

// POST /api/products (admin only)
router.post('/', authMiddleware, adminMiddleware, productController.createProduct);

// PUT /api/products/:id (admin only)
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);

// DELETE /api/products/:id (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
