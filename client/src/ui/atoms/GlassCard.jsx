import React from 'react';

/**
 * Glassmorphism Card - Unique frosted glass effect
 */
const GlassCard = ({ children, className = '', blur = 'md', onClick }) => {
  const blurLevels = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white/10 to-white/5
        border border-white/20
        ${blurLevels[blur]}
        shadow-[0_8px_32px_0_rgba(147,51,234,0.2)]
        hover:shadow-[0_8px_48px_0_rgba(147,51,234,0.4)]
        transition-all duration-500
        hover:-translate-y-2
        group
        ${className}
      `}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
