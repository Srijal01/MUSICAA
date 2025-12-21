import React from 'react';

/**
 * Neon Button - Glowing cyberpunk-style button
 */
const NeonButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  glow = true
}) => {
  const variants = {
    primary: `
      bg-gradient-to-r from-purple-600 to-pink-600
      text-white font-bold
      ${glow ? 'shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]' : ''}
    `,
    secondary: `
      bg-gradient-to-r from-cyan-500 to-blue-500
      text-white font-bold
      ${glow ? 'shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]' : ''}
    `,
    success: `
      bg-gradient-to-r from-green-500 to-emerald-500
      text-white font-bold
      ${glow ? 'shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)]' : ''}
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-orange-500
      text-white font-bold
      ${glow ? 'shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)]' : ''}
    `,
    outline: `
      bg-transparent border-2 border-purple-500
      text-purple-400 font-bold
      ${glow ? 'shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]' : ''}
      hover:bg-purple-500/20
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        rounded-xl
        ${variants[variant]}
        ${sizes[size]}
        transition-all duration-300
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        before:absolute before:inset-0
        before:bg-white/20 before:translate-y-full
        hover:before:translate-y-0
        before:transition-transform before:duration-300
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default NeonButton;
