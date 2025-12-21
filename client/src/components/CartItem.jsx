import { useState } from 'react';
import { cartService } from '../services/cartService';

function CartItem({ item, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setLoading(true);
      await cartService.updateCartItem(item.productId, newQuantity);
      onUpdate();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      await cartService.removeFromCart(item.productId);
      onUpdate();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-900 p-4 rounded-lg shadow-md mb-4 border border-gray-800">
      <img
        src={item.Product?.imageUrl || 'https://via.placeholder.com/100'}
        alt={item.Product?.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{item.Product?.name}</h3>
        <p className="text-gray-300 font-bold">NPR {item.Product?.price?.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleUpdateQuantity(item.quantity - 1)}
          disabled={loading || item.quantity <= 1}
          className="bg-gray-800 text-white w-8 h-8 rounded-full hover:bg-gray-700 hover:scale-110 hover:shadow-md active:scale-90 transition-all duration-200 disabled:opacity-50 border border-gray-700"
        >
          -
        </button>
        <span className="text-lg font-semibold w-12 text-center text-white">{item.quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
          disabled={loading}
          className="bg-gray-800 text-white w-8 h-8 rounded-full hover:bg-gray-700 hover:scale-110 hover:shadow-md active:scale-90 transition-all duration-200 disabled:opacity-50 border border-gray-700"
        >
          +
        </button>
      </div>
      <div className="text-lg font-bold text-white w-24 text-right">
        NPR {(item.Product?.price * item.quantity).toFixed(2)}
      </div>
      <button
        onClick={handleRemove}
        disabled={loading}
        className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

export default CartItem;
