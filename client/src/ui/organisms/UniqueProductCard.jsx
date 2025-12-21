import React, { useState } from 'react';
import GlassCard from '../atoms/GlassCard';
import NeonButton from '../atoms/NeonButton';
import Rating from '../atoms/Rating';

/**
 * Unique Product Card with 3D tilt and hover effects
 */
const UniqueProductCard = ({ product, onAddToCart, onAddToWishlist, onCompare }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <GlassCard
        className="p-0 overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Image container with gradient overlay */}
        <div className="relative h-64 overflow-hidden group">
          <img
            src={product.imageUrl || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Quick action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <button
              onClick={() => onAddToWishlist(product)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-red-500/50 hover:scale-110 transition-all duration-300"
            >
              ❤️
            </button>
            <button
              onClick={() => onCompare(product)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-blue-500/50 hover:scale-110 transition-all duration-300"
            >
              ⚖️
            </button>
          </div>

          {/* Badge */}
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs font-bold animate-pulse">
              Only {product.stock} left!
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl font-bold text-white">OUT OF STOCK</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Category */}
          <div className="text-purple-400 text-sm font-medium">
            {product.category?.main || 'Uncategorized'}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Rating value={product.averageRating || 4.5} size="sm" />
            <span className="text-gray-400 text-sm">({product.reviewCount || 0})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NPR {product.price?.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                NPR {product.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <NeonButton
              variant="primary"
              size="sm"
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className="flex-1"
            >
              <span>🛒</span>
              <span>Add to Cart</span>
            </NeonButton>
            <NeonButton
              variant="outline"
              size="sm"
              className="px-4"
            >
              👁️
            </NeonButton>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-300" />
      </GlassCard>
    </div>
  );
};

export default UniqueProductCard;
