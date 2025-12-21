import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NeonButton from '../atoms/NeonButton';

/**
 * Modern Navbar with glassmorphism and animations
 */
const ModernNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Products', path: '/products', icon: '🎸' },
    { name: 'Wishlist', path: '/wishlist', icon: '❤️' },
    { name: 'Compare', path: '/compare', icon: '⚖️' },
    { name: 'Orders', path: '/orders', icon: '📦' }
  ];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50
      transition-all duration-500
      ${scrolled 
        ? 'backdrop-blur-xl bg-black/50 shadow-[0_8px_32px_0_rgba(168,85,247,0.2)]' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300 group-hover:scale-110">
                M
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
              MUSICAA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="
                  group relative px-4 py-2 rounded-xl
                  text-gray-300 hover:text-white
                  transition-all duration-300
                  hover:bg-white/10
                "
              >
                <span className="flex items-center gap-2">
                  <span className="group-hover:scale-125 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="
              w-10 h-10 rounded-full
              bg-white/10 backdrop-blur-md border border-white/20
              flex items-center justify-center text-white
              hover:bg-white/20 hover:scale-110
              transition-all duration-300
            ">
              🔍
            </button>

            {/* Cart */}
            <button className="
              relative
              w-10 h-10 rounded-full
              bg-white/10 backdrop-blur-md border border-white/20
              flex items-center justify-center text-white
              hover:bg-white/20 hover:scale-110
              transition-all duration-300
            ">
              🛒
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center font-bold shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                3
              </span>
            </button>

            {/* Login Button */}
            <NeonButton variant="primary" size="sm" glow className="hidden sm:block">
              Login
            </NeonButton>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                md:hidden w-10 h-10 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20
                flex items-center justify-center text-white
                hover:bg-white/20
                transition-all duration-300
              "
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden
        backdrop-blur-xl bg-black/90
        border-t border-white/10
        transition-all duration-300
        ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
      `}>
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="
                block px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-gray-300 hover:text-white hover:bg-white/10
                transition-all duration-300
              "
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </span>
            </Link>
          ))}
          <NeonButton variant="primary" size="sm" glow className="w-full">
            Login
          </NeonButton>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
