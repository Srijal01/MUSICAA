import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/cartService';
import { orderService } from '../services/orderService';
import { authService } from '../services/authService';
import api from '../utils/api';

function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'cod',
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      if (!data?.items || data.items.length === 0) {
        navigate('/cart');
        return;
      }
      setCart(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    const subtotal = cart.items.reduce((total, item) => {
      return total + (item.Product?.price || 0) * item.quantity;
    }, 0);
    const shipping = subtotal > 50 ? 0 : 5;
    return subtotal + shipping;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.shippingAddress || !formData.city || !formData.postalCode || !formData.country) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const totalAmount = calculateTotal();
      const user = authService.getCurrentUser();

      // If COD, create order directly
      if (formData.paymentMethod === 'cod') {
        const orderData = {
          shippingAddress: formData.shippingAddress,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          paymentMethod: 'cod',
          totalAmount: totalAmount,
        };
        await orderService.createOrder(orderData);
        alert('Order placed successfully! You will pay cash on delivery.');
        navigate('/orders');
        return;
      }

      // For eSewa, initiate payment
      const paymentData = {
        amount: totalAmount,
        productId: `ORDER_${Date.now()}`,
        paymentGateway: formData.paymentMethod,
        customerName: user?.name || 'Customer',
        customerEmail: user?.email || '',
        customerPhone: '',
        productName: `Order Items (${cart.items.length} items)`,
        shippingDetails: {
          shippingAddress: formData.shippingAddress,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        }
      };

      console.log('Initiating payment with:', paymentData);
      const response = await api.post('/payment/initiate-payment', paymentData);
      console.log('Payment response:', response.data);
      
      // Store order details in sessionStorage for later completion
      sessionStorage.setItem('pendingOrder', JSON.stringify({
        ...formData,
        totalAmount: totalAmount,
        paymentId: paymentData.productId,
      }));

      if (response.data.paymentGateway === 'esewa') {
        // For eSewa, create and submit a form (POST request required)
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = response.data.formUrl;
        
        // Add all form fields
        Object.keys(response.data.formData).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = response.data.formData[key];
          form.appendChild(input);
        });
        
        document.body.appendChild(form);
        console.log('Submitting eSewa payment form...');
        form.submit();
      } else {
        throw new Error('Payment data not received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert(err.response?.data?.message || 'Failed to process checkout');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400"></div>
          <p className="mt-4 text-gray-400">Loading checkout...</p>
        </div>
      </div>
    );
  }

  const subtotal = cart?.items?.reduce((total, item) => {
    return total + (item.Product?.price || 0) * item.quantity;
  }, 0) || 0;
  const shipping = subtotal > 50 ? 0 : 5;
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-white mb-6">Shipping Information</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    placeholder="United States"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-white mb-6 mt-8">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-800 transition border-gray-700 bg-gray-800">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="esewa"
                    checked={formData.paymentMethod === 'esewa'}
                    onChange={handleChange}
                    className="text-gray-400 focus:ring-gray-600 w-4 h-4"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-gray-700 px-3 py-1 rounded">
                      <span className="font-bold text-green-400">eSewa</span>
                    </div>
                    <span className="font-medium text-gray-300">Pay with eSewa</span>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-800 transition border-gray-700 bg-gray-800">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="text-gray-400 focus:ring-gray-600 w-4 h-4"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium text-gray-300">Cash on Delivery (COD)</span>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-8 bg-gray-700 text-white py-4 rounded-lg hover:bg-gray-600 hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 border border-gray-600"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {formData.paymentMethod === 'cod' ? (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Place Order (COD)</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span>Proceed to Payment</span>
                      </>
                    )}
                  </>
                )}
              </button>
              
              {formData.paymentMethod === 'esewa' && (
                <p className="text-sm text-gray-400 text-center mt-4">
                  You will be redirected to eSewa payment gateway
                </p>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg shadow-md p-6 sticky top-8 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cart?.items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {item.Product?.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-white">
                      NPR {((item.Product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>NPR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `NPR ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-800 pt-3">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>NPR {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
