import { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getUserOrders();
      setOrders(data);
      
      // Mark orders as viewed
      const pendingOrders = data.filter(order => 
        order.status === 'Pending' || order.status === 'Processing'
      );
      const orderIds = pendingOrders.map(o => o._id).join(',');
      localStorage.setItem('lastViewedOrders', orderIds);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400"></div>
          <p className="mt-4 text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-gray-900 rounded-lg shadow-md p-12 text-center border border-gray-800">
            <svg
              className="mx-auto h-24 w-24 text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-white mb-2">No orders yet</h2>
            <p className="text-gray-400 mb-6">Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Order ID: <span className="font-mono font-semibold text-white">#{(order.id || order._id)?.slice(-6).toUpperCase()}</span></p>
                      <p className="text-sm text-gray-600 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <p className="text-lg font-bold text-gray-800 mt-2">
                        ${parseFloat(order.totalAmount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Items:</h3>
                  <div className="space-y-2">
                    {order.OrderItems?.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.Product?.imageUrl || 'https://via.placeholder.com/60'}
                            alt={item.Product?.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{item.Product?.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-800">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Shipping Address:</span> {order.shippingAddress}, {order.city}, {order.postalCode}, {order.country}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Payment Method:</span> {order.paymentMethod?.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
