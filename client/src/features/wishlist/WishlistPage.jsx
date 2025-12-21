import React from 'react';
import { useWishlist } from './WishlistContext';
import Button from '../../ui/atoms/Button';
import Card from '../../ui/atoms/Card';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto text-center py-16">
          <svg
            className="w-24 h-24 mx-auto text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-400 mb-8">Start adding products you love!</p>
          <Link to="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist ({wishlist.length})</h1>
          {wishlist.length > 0 && (
            <Button variant="danger" size="sm" onClick={clearWishlist}>
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <Card key={product._id} hover className="relative">
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <Link to={`/products/${product._id}`}>
                <img
                  src={product.imageUrl || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
                <p className="text-purple-500 font-bold text-xl mb-4">
                  NPR {product.price?.toLocaleString()}
                </p>
              </Link>

              <Button variant="primary" className="w-full" size="sm">
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
