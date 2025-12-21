import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data.slice(0, 8)); // Show 8 featured products for a fuller look
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Musical Instruments */}
      <div className="relative bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-blue-900/30 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 glass rounded-full text-purple-300 text-sm font-semibold">
              🎵 Premium Musical Instruments
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
              Welcome to <span className="gradient-text">MUSICAA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
              Discover world-class guitars, pianos, drums & professional audio equipment for musicians of all levels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/products"
                className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95 transition-all duration-300"
              >
                Explore Instruments →
              </Link>
              <Link
                to="/products"
                className="inline-block glass text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-gray-400 text-lg">Find your perfect instrument</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Guitars */}
          <Link to="/products?category=guitars" className="group">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500" 
                alt="Acoustic & Electric Guitars" 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">Guitars</h3>
                <p className="text-gray-400 mt-2 text-sm">Acoustic, Electric & Classical</p>
              </div>
            </div>
          </Link>

          {/* Keyboards & Pianos */}
          <Link to="/products?category=keyboards" className="group">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500" 
                alt="Digital Pianos" 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">Keyboards & Pianos</h3>
                <p className="text-gray-400 mt-2 text-sm">Digital Pianos, Synthesizers & MIDI</p>
              </div>
            </div>
          </Link>

          {/* Drums & Percussion */}
          <Link to="/products?category=drums" className="group">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500" 
                alt="Drum Kits" 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">Drums & Percussion</h3>
                <p className="text-gray-400 mt-2 text-sm">Acoustic & Electronic Drum Kits</p>
              </div>
            </div>
          </Link>

          {/* Wind Instruments */}
          <Link to="/products?category=wind-instruments" className="group">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500" 
                alt="Saxophones & Wind Instruments" 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">Wind Instruments</h3>
                <p className="text-gray-400 mt-2 text-sm">Saxophones, Flutes, Clarinets & More</p>
              </div>
            </div>
          </Link>

          {/* Bass Guitars */}
          <Link to="/products?category=bass" className="group">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=500" 
                alt="Bass Guitars" 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">Bass Guitars</h3>
                <p className="text-gray-400 mt-2 text-sm">4-String, 5-String & Acoustic Bass</p>
              </div>
            </div>
          </Link>

          {/* Audio Equipment */}
          <Link to="/products?category=audio-equipment" className="group">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500" 
                alt="Audio Equipment" 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">Audio Equipment</h3>
                <p className="text-gray-400 mt-2 text-sm">Amps, Speakers & Audio Interfaces</p>
              </div>
            </div>
          </Link>

          {/* String Instruments */}
          <Link to="/products?category=strings" className="group">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=500" 
                alt="Violins & String Instruments" 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">String Instruments</h3>
                <p className="text-gray-400 mt-2 text-sm">Violins, Cellos, Ukuleles & More</p>
              </div>
            </div>
          </Link>

          {/* Accessories */}
          <Link to="/products?category=accessories" className="group">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500" 
                alt="Music Accessories" 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">Accessories</h3>
                <p className="text-gray-400 mt-2 text-sm">Strings, Picks, Cases, Stands & More</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

    
      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Featured <span className="gradient-text">Instruments</span></h2>
            <p className="text-gray-400">Handpicked instruments for you</p>
          </div>
          <Link to="/products" className="text-purple-400 hover:text-purple-300 font-bold text-lg flex items-center space-x-2 glass px-6 py-3 rounded-full hover:scale-105 transition-all">
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-gray-400"></div>
            <p className="mt-6 text-xl text-gray-400">Loading featured instruments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-xl">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No instruments available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};