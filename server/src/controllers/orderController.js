// Order Controller
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Create order (checkout)
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress, city, postalCode, country, paymentMethod, totalAmount, isPaid, paymentId } = req.body;

    // Validation
    if (!shippingAddress || !city || !postalCode || !country || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Get cart items
    const cartItems = await CartItem.find({ cartId: cart._id }).populate('productId');
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total and check stock
    let calculatedTotal = 0;
    for (const item of cartItems) {
      const product = item.productId;
      
      if (!product) {
        return res.status(400).json({ message: 'Product not found' });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}` 
        });
      }

      calculatedTotal += product.price * item.quantity;
    }

    // Create order
    // Set order status and payment status
    // If isPaid is explicitly set (from payment verification), use it
    // Otherwise, determine based on payment method (COD is always unpaid)
    const isPrePaid = paymentMethod === 'esewa';
    const paymentStatus = isPaid === true ? 'paid' : (paymentMethod === 'cod' ? 'unpaid' : 'unpaid');
    const order = new Order({
      userId,
      totalAmount: totalAmount || calculatedTotal,
      shippingAddress,
      city,
      postalCode,
      country,
      paymentMethod,
      status: paymentStatus === 'paid' ? 'processing' : 'pending',
      paymentStatus: paymentStatus,
      transactionId: paymentId || null,
    });

    await order.save();

    // Create order items and update stock
    for (const item of cartItems) {
      const product = item.productId;
      
      // Create order item
      const orderItem = new OrderItem({
        orderId: order._id,
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        imageUrl: product.imageUrl,
      });
      await orderItem.save();

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Clear cart
    await CartItem.deleteMany({ cartId: cart._id });

    res.status(201).json({ 
      message: 'Order placed successfully', 
      order 
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await OrderItem.find({ orderId: order._id }).populate('productId');
        return {
          ...order.toObject(),
          id: order._id, // Add id field for frontend compatibility
          OrderItems: orderItems.map(item => ({
            id: item._id,
            orderId: item.orderId,
            productId: item.productId?._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
            Product: item.productId ? {
              id: item.productId._id,
              name: item.productId.name,
              imageUrl: item.productId.imageUrl,
            } : null,
          })),
        };
      })
    );

    res.json(ordersWithItems);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get order items
    const orderItems = await OrderItem.find({ orderId: order._id }).populate('productId');

    res.json({
      ...order.toObject(),
      OrderItems: orderItems,
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await OrderItem.find({ orderId: order._id });
        return {
          ...order.toObject(),
          id: order._id, // Add id field for frontend compatibility
          OrderItems: orderItems,
        };
      })
    );

    res.json(ordersWithItems);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete order (admin only)
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete associated order items
    await OrderItem.deleteMany({ orderId: order._id });

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
