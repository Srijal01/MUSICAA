import React from 'react';

/**
 * Reusable Card component
 */
const Card = ({ children, hover = false, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-900 border border-gray-800 rounded-lg p-4 ${
        hover ? 'hover:shadow-xl hover:shadow-purple-900/20 hover:scale-105 transition-all duration-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
