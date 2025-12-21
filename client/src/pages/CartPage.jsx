import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/cartService';
import CartItem from '../components/CartItem';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    // Mark cart as viewed when component unmounts or cart changes
    if (cart?.items) {
      localStorage.setItem('lastViewedCart', JSON.stringify(cart.items));
    }
  }, [cart]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCart(data);
      // Mark cart as viewed
      if (data?.items) {
        localStorage.setItem('lastViewedCart', JSON.stringify(data.items));
      }
    } catch (err) {
      setError('Failed to load cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.Product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
    try {
      await cartService.clearCart();
      fetchCart();
    } catch (err) {
      alert('Failed to clear cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400"></div>
          <p className="mt-4 text-gray-400">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={fetchCart}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const total = calculateTotal();
  const itemCount = cart?.items?.length || 0;

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {itemCount === 0 ? (
          <div className="bg-gray-900 rounded-lg shadow-md p-12 text-center border border-gray-800">
            <svg
              className="mx-auto h-24 w-24 text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some instruments to get started!</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-700 transition text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} onUpdate={fetchCart} />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg shadow-md p-6 sticky top-8 border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>NPR {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>{total > 50 ? 'FREE' : 'NPR 5.00'}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span>NPR {(total + (total > 50 ? 0 : 5)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 font-semibold text-lg border border-gray-600"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="w-full mt-3 border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
