import React from 'react';

/**
 * Reusable Button component with variants
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  icon = null,
  loading = false
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:scale-105 active:scale-95',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white hover:shadow-lg hover:scale-105 active:scale-95',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-105 active:scale-95',
    danger: 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:scale-105 active:scale-95',
    success: 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:scale-105 active:scale-95',
    ghost: 'hover:bg-gray-800 text-gray-300 hover:scale-105 active:scale-95'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
