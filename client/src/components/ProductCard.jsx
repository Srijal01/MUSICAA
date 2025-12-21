import { Link } from 'react-router-dom';
import { cartService } from '../services/cartService';
import { authService } from '../services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isAdmin = authService.isAdmin();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    try {
      setLoading(true);
      await cartService.addToCart(product._id, 1);
      alert('Product added to cart!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="block group h-full">
      <div className="relative glass rounded-3xl overflow-hidden hover:shadow-[0_8px_40px_0_rgba(168,85,247,0.4)] hover:scale-[1.03] transition-all duration-500 h-full flex flex-col border border-white/20 backdrop-blur-xl">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/30 to-indigo-900/30 h-72 flex-shrink-0">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 p-4"
          />
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_20px_rgba(249,115,22,0.6)] animate-pulse">
              Only {product.stock} left!
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-red-700 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.8)]">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
        
        <div className="relative p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
          {product.category && product.category.sub && (
            <div className="mb-3">
              <span className="text-xs bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 px-4 py-1.5 rounded-full border border-purple-400/40 font-bold uppercase tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                {product.category.sub}
              </span>
            </div>
          )}
          
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300 min-h-[3.5rem]">
            {product.name}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Price</span>
              <span className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                NPR {product.price?.toLocaleString()}
              </span>
            </div>
            
            {!isAdmin && (
              <button
                onClick={handleAddToCart}
                disabled={loading || product.stock === 0}
                className={`relative overflow-hidden ${
                  product.stock === 0
                    ? 'bg-gray-800 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] active:scale-95'
                } text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 font-bold text-sm before:absolute before:inset-0 before:bg-white/20 before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-300`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <span className="animate-pulse">Adding...</span>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Add</span>
                    </>
                  )}
                </span>
              </button>
            )}
            
            {isAdmin && (
              <div className="flex items-center gap-2 text-sm text-purple-400 font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Admin View
              </div>
            )}
          </div>
        </div>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-500 pointer-events-none" />
      </div>
    </Link>
  );
}

export default ProductCard;
