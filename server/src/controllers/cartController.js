// Cart Controller
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId });
      await cart.save();
    }

    // Get cart items with product details
    const cartItems = await CartItem.find({ cartId: cart._id })
      .populate('productId');

    // Format response
    const items = cartItems.map(item => ({
      id: item._id,
      productId: item.productId._id,
      quantity: item.quantity,
      Product: {
        id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        imageUrl: item.productId.imageUrl,
        stock: item.productId.stock,
      },
    }));

    res.json({ id: cart._id, userId: cart.userId, items });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid product or quantity' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId });
      await cart.save();
    }

    // Check if item already in cart
    let cartItem = await CartItem.findOne({ cartId: cart._id, productId });
    
    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stock) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      await cartItem.save();
    } else {
      // Add new item
      cartItem = new CartItem({
        cartId: cart._id,
        productId,
        quantity,
      });
      await cartItem.save();
    }

    res.json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid product or quantity' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Find cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Update cart item
    const cartItem = await CartItem.findOne({ cartId: cart._id, productId });
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: 'Cart updated', cartItem });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    // Find cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove cart item
    const result = await CartItem.findOneAndDelete({ 
      cartId: cart._id, 
      productId 
    });

    if (!result) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove all cart items
    await CartItem.deleteMany({ cartId: cart._id });

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
