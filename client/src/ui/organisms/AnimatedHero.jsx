import React from 'react';
import NeonButton from '../atoms/NeonButton';

/**
 * Animated Hero Section with particle effects
 */
const AnimatedHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-gradient" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjgsODUsMjQ3LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-500 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 space-y-8">
        {/* Glowing title */}
        <h1 className="text-7xl md:text-9xl font-black">
          <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
            MUSICAA
          </span>
        </h1>

        {/* Subtitle with typewriter effect */}
        <p className="text-2xl md:text-3xl text-gray-300 font-light">
          Where <span className="text-purple-400 font-bold">Sound</span> Meets{' '}
          <span className="text-pink-400 font-bold">Soul</span>
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Discover premium musical instruments crafted for artists who dare to create
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <NeonButton variant="primary" size="lg" glow>
            <span>🎸</span>
            <span>Explore Collection</span>
          </NeonButton>
          <NeonButton variant="outline" size="lg" glow>
            <span>▶️</span>
            <span>Watch Demo</span>
          </NeonButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
          {[
            { label: 'Instruments', value: '500+' },
            { label: 'Happy Artists', value: '10K+' },
            { label: 'Countries', value: '50+' }
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-500 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-purple-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHero;
