import React, { useState } from 'react';

/**
 * Floating Action Button - Expandable menu
 */
const FloatingActionButton = ({ actions = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Action buttons */}
      <div className={`
        flex flex-col-reverse gap-3 mb-3
        transition-all duration-300
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="
              group relative
              w-14 h-14 rounded-full
              bg-gradient-to-br from-purple-600 to-pink-600
              text-white font-bold
              shadow-[0_0_20px_rgba(168,85,247,0.6)]
              hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]
              hover:scale-110 active:scale-95
              transition-all duration-300
              flex items-center justify-center
            "
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {action.icon}
            {/* Tooltip */}
            <span className="
              absolute right-16 px-3 py-1.5
              bg-gray-900 text-white text-sm rounded-lg
              whitespace-nowrap
              opacity-0 group-hover:opacity-100
              pointer-events-none
              transition-opacity duration-200
            ">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full
          bg-gradient-to-br from-purple-600 via-pink-600 to-red-600
          text-white font-bold text-2xl
          shadow-[0_0_30px_rgba(168,85,247,0.8)]
          hover:shadow-[0_0_50px_rgba(168,85,247,1)]
          hover:scale-110 active:scale-95
          transition-all duration-300
          flex items-center justify-center
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
      >
        +
      </button>
    </div>
  );
};

export default FloatingActionButton;
