import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import { authService } from '../services/authService';
import ProductCard from '../components/ProductCard';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const isAdmin = authService.isAdmin();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setProduct(data);
      setSelectedImage(data.imageUrl);
      // Fetch related products (all products for now, could be filtered by category)
      const allProducts = await productService.getAllProducts();
      setRelatedProducts(allProducts.filter(p => p._id !== id).slice(0, 4));
    } catch (err) {
      setError('Failed to load product details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      await cartService.addToCart(product._id, quantity);
      alert('Product added to cart!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400"></div>
          <p className="mt-4 text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-gray-300">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/products')} className="hover:text-gray-300">Products</button>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={selectedImage || product.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.stock === 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    Out of Stock
                  </div>
                )}
                {product.stock > 0 && product.stock < 10 && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    Only {product.stock} left!
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{product.name}</h1>
              
              {/* Category */}
              {product.category && product.category.main && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-700">
                    {product.category.main}
                  </span>
                  {product.category.sub && (
                    <>
                      <span className="text-gray-600">→</span>
                      <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium border border-gray-600">
                        {product.category.sub}
                      </span>
                    </>
                  )}
                </div>
              )}
              
              {/* Rating & Reviews */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-400">(4.5) • 128 reviews</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-gray-300">NPR {product.price?.toFixed(2)}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6 pb-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  {product.stock > 0 ? (
                    <>
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-400 font-medium">In Stock ({product.stock} available)</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-400 font-medium">Out of Stock</span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">About this product</h3>
                <p className="text-gray-400 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              {!isAdmin && (
                <div className="mb-6">
                  <label className="text-white font-semibold mb-2 block">Quantity:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border-2 border-gray-700 rounded-lg bg-gray-800">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 text-gray-300 hover:bg-gray-700 hover:scale-110 active:scale-90 transition-all duration-200 font-semibold"
                      >
                        −
                      </button>
                      <span className="px-6 py-3 font-semibold text-lg border-l border-r border-gray-700 text-white">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                        className="px-4 py-3 text-gray-300 hover:bg-gray-700 hover:scale-110 active:scale-90 transition-all duration-200 disabled:opacity-50 font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-gray-400">
                      {product.stock > 0 && `(${product.stock} available)`}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!isAdmin ? (
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart || product.stock === 0}
                    className={`w-full ${
                      product.stock === 0
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600'
                    } text-white px-8 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center space-x-2 disabled:opacity-50 border border-gray-600`}
                  >
                    {addingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Adding to Cart...</span>
                      </>
                    ) : product.stock === 0 ? (
                      <span>Out of Stock</span>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      handleAddToCart();
                      setTimeout(() => navigate('/checkout'), 1000);
                    }}
                    disabled={product.stock === 0}
                    className="w-full bg-orange-600 hover:bg-orange-500 hover:scale-105 hover:shadow-2xl active:scale-95 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-orange-700"
                  >
                    Buy Now
                  </button>
                </div>
              ) : (
                <div className="glass rounded-2xl p-6 border-2 border-purple-500/30">
                  <div className="flex items-center justify-center gap-3 text-purple-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="text-center">
                      <div className="font-bold text-xl text-white mb-1">Admin View</div>
                      <div className="text-sm text-gray-400">You're viewing this product as an administrator</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <button
                      onClick={() => navigate('/admin')}
                      className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    >
                      Go to Admin Dashboard →
                    </button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-sm text-gray-600">Easy Returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm text-gray-600">2 Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Product Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex py-3 border-b border-gray-800">
                  <span className="font-semibold text-gray-300 w-1/3">{key}:</span>
                  <span className="text-gray-400">{value}</span>
                </div>
              ))} 
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews Section */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Customer Reviews</h2>
          
          {/* Review Summary */}
          <div className="flex items-center mb-8 pb-8 border-b border-gray-800">
            <div className="text-center mr-12">
              <div className="text-5xl font-bold text-white">4.5</div>
              <div className="flex items-center justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'} fill-current`} viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-400 mt-1">Based on 128 reviews</div>
            </div>
            
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center mb-2">
                  <span className="text-sm text-gray-400 w-12">{stars} star</span>
                  <div className="flex-1 mx-4 bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-12">{stars === 5 ? 90 : stars === 4 ? 25 : stars === 3 ? 8 : 3}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-6">
            {[
              { name: 'John Doe', rating: 5, date: '2 days ago', comment: 'Excellent product! Exactly as described. Fast shipping and great quality.' },
              { name: 'Jane Smith', rating: 4, date: '1 week ago', comment: 'Very good product, though shipping took a bit longer than expected. Overall satisfied with the purchase.' }
            ].map((review, idx) => (
              <div key={idx} className="border-b border-gray-800 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-white">{review.name}</div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'} fill-current`} viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-400 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full py-3 border-2 border-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
