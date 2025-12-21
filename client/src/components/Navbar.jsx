import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { cartService } from '../services/cartService';
import { orderService } from '../services/orderService';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [showCartBadge, setShowCartBadge] = useState(false);
  const [showOrderBadge, setShowOrderBadge] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    if (currentUser && currentUser.role !== 'admin') {
      fetchCartCount();
      fetchOrderCount();
      // Poll for updates every 30 seconds
      const interval = setInterval(() => {
        fetchCartCount();
        fetchOrderCount();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const fetchCartCount = async () => {
    try {
      const cart = await cartService.getCart();
      const totalItems = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      
      // Check if cart was viewed
      const lastViewedCart = localStorage.getItem('lastViewedCart');
      const currentCartState = JSON.stringify(cart.items);
      
      // Only show badge if cart state changed AND user hasn't viewed it yet
      if (lastViewedCart && lastViewedCart !== currentCartState && totalItems > 0) {
        setShowCartBadge(true);
      } else if (!lastViewedCart && totalItems > 0) {
        // First time adding to cart
        setShowCartBadge(true);
      } else {
        setShowCartBadge(false);
      }
      
      setCartCount(totalItems);
    } catch (err) {
      console.error('Failed to fetch cart count:', err);
      setShowCartBadge(false);
      setCartCount(0);
    }
  };

  const fetchOrderCount = async () => {
    try {
      const orders = await orderService.getUserOrders();
      // Count pending/processing orders as notifications
      const pendingOrders = orders.filter(order => 
        order.status === 'Pending' || order.status === 'Processing'
      );
      
      // Check if orders were viewed
      const lastViewedOrders = localStorage.getItem('lastViewedOrders');
      const currentOrderIds = pendingOrders.map(o => o._id).join(',');
      
      if (lastViewedOrders !== currentOrderIds && pendingOrders.length > 0) {
        setShowOrderBadge(true);
      } else {
        setShowOrderBadge(false);
      }
      
      setOrderCount(pendingOrders.length);
    } catch (err) {
      console.error('Failed to fetch order count:', err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 backdrop-blur-md bg-opacity-80 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            
            <img src="/logo.svg" alt="Musicaa Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors font-medium relative ${
                isActive('/') 
                  ? 'text-purple-400' 
                  : 'text-white hover:text-purple-400'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/products" 
              className={`transition-colors font-medium relative ${
                isActive('/products') 
                  ? 'text-purple-400' 
                  : 'text-white hover:text-purple-400'
              }`}
            >
              Instruments
              {isActive('/products') && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
              )}
            </Link>
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link 
                    to="/admin" 
                    className={`transition font-medium relative ${
                      isActive('/admin') 
                        ? 'text-purple-400' 
                        : 'hover:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Admin Dashboard</span>
                    </div>
                    {isActive('/admin') && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                    )}
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/cart" 
                      className={`relative transition flex items-center ${
                        isActive('/cart') 
                          ? 'text-purple-400' 
                          : 'hover:text-gray-300'
                      }`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="ml-1">Cart</span>
                      {isActive('/cart') && (
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                      )}
                      {cartCount > 0 && showCartBadge && (
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-bounce-in">
                          {cartCount}
                          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>
                          <span className="relative z-10">{cartCount}</span>
                        </span>
                      )}
                    </Link>
                    <Link 
                      to="/orders" 
                      className={`relative transition ${
                        isActive('/orders') 
                          ? 'text-purple-400' 
                          : 'hover:text-gray-300'
                      }`}
                    >
                      My Orders
                      {isActive('/orders') && (
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                      )}
                      {orderCount > 0 && showOrderBadge && (
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-bounce-in">
                          <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></span>
                          <span className="relative z-10">{orderCount}</span>
                        </span>
                      )}
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-purple-300">Hello, {user.name}</span>
                  <button onClick={handleLogout} className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2.5 rounded-full hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 font-medium">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-purple-400 transition-colors font-medium">Login</Link>
                <Link to="/register" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2.5 rounded-full hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 font-medium">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-gray-300 transition">Home</Link>
            <Link to="/products" className="block py-2 hover:text-gray-300 transition">Instruments</Link>
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin" className="block py-2 hover:text-gray-300 transition font-medium">Admin Dashboard</Link>
                ) : (
                  <>
                    <Link to="/cart" className="relative block py-2 hover:text-gray-300 transition inline-flex items-center">
                      Cart
                      {cartCount > 0 && showCartBadge && (
                        <span className="ml-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-bounce-in">
                          <span className="relative">{cartCount}</span>
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="relative block py-2 hover:text-gray-300 transition inline-flex items-center">
                      My Orders
                      {orderCount > 0 && showOrderBadge && (
                        <span className="ml-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-bounce-in">
                          <span className="relative">{orderCount}</span>
                        </span>
                      )}
                    </Link>
                  </>
                )}
                <div className="pt-2">
                  <span className="block text-sm mb-2">Hello, {user.name}</span>
                  <button onClick={handleLogout} className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 font-medium w-full">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-gray-300 transition">Login</Link>
                <Link to="/register" className="block py-2 hover:text-gray-300 transition">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
