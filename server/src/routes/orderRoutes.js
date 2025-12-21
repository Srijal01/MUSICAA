// Order Routes
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// All order routes require authentication
router.use(authMiddleware);

// POST /api/orders (create order/checkout)
router.post('/', orderController.createOrder);

// GET /api/orders (get user's orders)
router.get('/', orderController.getUserOrders);

// GET /api/orders/all (get all orders - admin only)
router.get('/all', adminMiddleware, orderController.getAllOrders);

// GET /api/orders/:id (get order by ID)
router.get('/:id', orderController.getOrderById);

// PUT /api/orders/:id/status (update order status - admin only)
router.put('/:id/status', adminMiddleware, orderController.updateOrderStatus);

// DELETE /api/orders/:id (delete order - admin only)
router.delete('/:id', adminMiddleware, orderController.deleteOrder);

module.exports = router;
