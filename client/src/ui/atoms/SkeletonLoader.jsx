import React from 'react';

/**
 * Unique Skeleton Loader with shimmer effect
 */
const SkeletonLoader = ({ type = 'card', className = '' }) => {
  const loaders = {
    card: (
      <div className={`glass-dark rounded-2xl p-6 space-y-4 ${className}`}>
        <div className="h-48 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-xl animate-shimmer bg-[length:200%_100%]" />
        <div className="space-y-3">
          <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
          <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-2/3 animate-shimmer bg-[length:200%_100%]" />
          <div className="h-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-1/2 animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>
    ),
    line: (
      <div className={`h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded animate-shimmer bg-[length:200%_100%] ${className}`} />
    ),
    circle: (
      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer bg-[length:200%_100%] ${className}`} />
    ),
    text: (
      <div className={`space-y-2 ${className}`}>
        <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
        <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-5/6 animate-shimmer bg-[length:200%_100%]" />
        <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-4/6 animate-shimmer bg-[length:200%_100%]" />
      </div>
    )
  };

  return loaders[type] || loaders.card;
};

export default SkeletonLoader;
