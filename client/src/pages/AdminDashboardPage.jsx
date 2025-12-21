import { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';

function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  // Product form states
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    cloudinaryId: '',
    category: { main: '', sub: '' },
    specifications: {},
  });
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [predefinedCategories, setPredefinedCategories] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await productService.getAllCategories();
      setPredefinedCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData] = await Promise.all([
        productService.getAllProducts(),
        orderService.getAllOrders().catch(() => []),
      ]);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Product handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
      cloudinaryId: '',
      category: { main: '', sub: '' },
      specifications: {},
    });
    setImageFile(null);
    setImagePreview('');
    setSpecKey('');
    setSpecValue('');
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl || '',
      cloudinaryId: product.cloudinaryId || '',
      category: product.category || { main: '', sub: '' },
      specifications: product.specifications || {},
    });
    setImageFile(null);
    setImagePreview(product.imageUrl || '');
    setSpecKey('');
    setSpecValue('');
    setShowProductForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const formDataImg = new FormData();
    formDataImg.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataImg,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      return { imageUrl: data.imageUrl, cloudinaryId: data.cloudinaryId };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      
      let productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        imageUrl: formData.imageUrl,
        cloudinaryId: formData.cloudinaryId,
        category: formData.category || { main: '', sub: '' },
        specifications: formData.specifications || {},
      };

      // Upload new image if selected
      if (imageFile) {
        const uploadResult = await uploadImage();
        if (uploadResult) {
          productData.imageUrl = uploadResult.imageUrl;
          productData.cloudinaryId = uploadResult.cloudinaryId;
        }
      }

      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, productData);
        alert('Product updated successfully!');
      } else {
        await productService.createProduct(productData);
        alert('Product created successfully!');
      }
      
      setShowProductForm(false);
      setImageFile(null);
      setImagePreview('');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to save product');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productService.deleteProduct(id);
      alert('Product deleted successfully!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  };

  // Order handlers
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      alert('Order status updated successfully!');
      fetchData();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;
    
    try {
      await orderService.deleteOrder(orderId);
      alert('Order deleted successfully!');
      setShowOrderDetails(false);
      setSelectedOrder(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete order');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-900 text-yellow-300 border border-yellow-700',
      processing: 'bg-blue-900 text-blue-300 border border-blue-700',
      shipped: 'bg-purple-900 text-purple-300 border border-purple-700',
      delivered: 'bg-green-900 text-green-300 border border-green-700',
      cancelled: 'bg-red-900 text-red-300 border border-red-700',
    };
    return colors[status] || 'bg-gray-800 text-gray-300 border border-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
          <p className="mt-4 text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-white mb-2">Admin <span className="gradient-text">Dashboard</span></h1>
          <p className="mt-2 text-gray-400">Manage instruments and customer orders</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold transition-all rounded-t-lg ${activeTab === 'products' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Instruments ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold transition-all rounded-t-lg ${activeTab === 'orders' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold"
              >
                + Add New Instrument
              </button>
            </div>

            {showProductForm && (
              <div className="glass rounded-2xl p-8 mb-6 border border-white/10 card-shadow">
                <h2 className="text-3xl font-bold text-white mb-6">
                  {editingProduct ? 'Edit Instrument' : 'Add New Instrument'}
                </h2>
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Instrument Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      required
                      className="w-full px-4 py-3 glass text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        required
                        className="w-full px-4 py-3 glass text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        required
                        className="w-full px-4 py-3 glass text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 glass text-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Categories Section - Two-Step Selection */}
                  <div className="border-t border-gray-800 pt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Product Category</label>
                    <div className="space-y-3">
                      {/* Step 1: Select Parent Category */}
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">1. Select Main Category</label>
                        <select
                          value={formData.category.main}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              category: { main: e.target.value, sub: '' },
                            });
                          }}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                          <option value="">-- Choose Main Category --</option>
                          {predefinedCategories.map((category, idx) => (
                            <option key={idx} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Step 2: Select Subcategory (only shown when main is selected) */}
                      {formData.category.main && (
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">2. Select Subcategory</label>
                          <select
                            value={formData.category.sub}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                category: { ...formData.category, sub: e.target.value },
                              });
                            }}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                          >
                            <option value="">-- Choose Subcategory --</option>
                            {predefinedCategories
                              .find(cat => cat.name === formData.category.main)
                              ?.subcategories.map((sub, idx) => (
                                <option key={idx} value={sub}>
                                  {sub}
                                </option>
                              ))}
                          </select>
                        </div>
                      )}

                      {/* Display selected category */}
                      {formData.category.main && formData.category.sub && (
                        <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                          <p className="text-sm text-gray-300">
                            <strong className="text-white">Selected:</strong> {formData.category.main} → {formData.category.sub}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Product Specifications Section */}
                  <div className="border-t border-gray-800 pt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Product Specifications</label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Key (e.g., Brand, Weight)"
                          value={specKey}
                          onChange={(e) => setSpecKey(e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., Samsung, 500g)"
                          value={specValue}
                          onChange={(e) => setSpecValue(e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (specKey.trim() && specValue.trim()) {
                              setFormData({
                                ...formData,
                                specifications: {
                                  ...formData.specifications,
                                  [specKey.trim()]: specValue.trim(),
                                },
                              });
                              setSpecKey('');
                              setSpecValue('');
                            }
                          }}
                          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold border border-green-600"
                        >
                          Add
                        </button>
                      </div>
                      
                      {/* Display existing specifications */}
                      {Object.keys(formData.specifications || {}).length > 0 && (
                        <div className="bg-gray-800 rounded-lg p-4 space-y-2 border border-gray-700">
                          <p className="text-sm font-medium text-gray-300 mb-2">Current Specifications:</p>
                          {Object.entries(formData.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded border border-gray-600">
                              <span className="text-sm text-gray-300">
                                <strong>{key}:</strong> {value}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newSpecs = { ...formData.specifications };
                                  delete newSpecs[key];
                                  setFormData({ ...formData, specifications: newSpecs });
                                }}
                                className="text-red-400 hover:text-red-300 text-sm font-medium"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? 'Uploading...' : (editingProduct ? 'Update Product' : 'Add Product')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProductForm(false)}
                      className="glass text-gray-300 px-8 py-3 rounded-full hover:bg-white/10 transition-all font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="glass rounded-2xl overflow-hidden border border-white/10 card-shadow">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img 
                            src={product.imageUrl || 'https://via.placeholder.com/50'} 
                            alt={product.name} 
                            className="w-16 h-16 rounded-xl object-cover border border-white/10" 
                          />
                          <div className="ml-4">
                            <div className="text-sm font-bold text-white">{product.name}</div>
                            <div className="text-sm text-gray-400">{product.description?.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold gradient-text">
                        NPR {product.price?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{product.stock}</td>
                      <td className="px-6 py-4 text-sm space-x-3">
                        <button 
                          onClick={() => handleEditProduct(product)} 
                          className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product._id)} 
                          className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="glass rounded-2xl p-6 border border-white/10 card-shadow hover:scale-105 transition-transform">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Total Orders</h3>
                <p className="text-4xl font-bold gradient-text">{orders.length}</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10 card-shadow hover:scale-105 transition-transform">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Paid Orders</h3>
                <p className="text-4xl font-bold text-green-400">{orders.filter(o => o.paymentStatus === 'paid').length}</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10 card-shadow hover:scale-105 transition-transform">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Unpaid (COD)</h3>
                <p className="text-4xl font-bold text-orange-400">{orders.filter(o => o.paymentStatus === 'unpaid').length}</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10 card-shadow hover:scale-105 transition-transform">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Processing</h3>
                <p className="text-4xl font-bold text-blue-400">{orders.filter(o => o.status === 'processing').length}</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10 card-shadow hover:scale-105 transition-transform">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Delivered</h3>
                <p className="text-4xl font-bold text-purple-400">{orders.filter(o => o.status === 'delivered').length}</p>
              </div>
            </div>

            {/* Orders List */}
            <div className="glass rounded-2xl overflow-hidden border border-white/10 card-shadow">
              <div className="px-6 py-6 border-b border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white">All Customer Orders</h2>
                <p className="text-sm text-gray-400 mt-1">View and manage orders from all customers</p>
              </div>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500 mt-4">No customer orders yet</p>
                  <p className="text-sm text-gray-400 mt-2">Orders from customers will appear here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-800">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-800">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                            #{order._id?.slice(-6).toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            <div>
                              <div className="font-medium">{order.userId?.name || 'N/A'}</div>
                              <div className="text-gray-400 text-xs">{order.userId?.email || ''}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                            NPR {parseFloat(order.totalAmount).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col space-y-1">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full text-center ${
                                order.paymentStatus === 'paid' 
                                  ? 'bg-green-900 text-green-300 border border-green-700' 
                                  : order.paymentStatus === 'unpaid'
                                  ? 'bg-orange-900 text-orange-300 border border-orange-700'
                                  : 'bg-gray-800 text-gray-300 border border-gray-700'
                              }`}>
                                {order.paymentStatus === 'paid' ? '✓ Paid' : order.paymentStatus === 'unpaid' ? 'Unpaid (COD)' : order.paymentStatus || 'Unpaid'}
                              </span>
                              <span className="text-xs text-gray-500 text-center">{order.paymentMethod?.toUpperCase()}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                            <button 
                              onClick={() => handleViewOrder(order)}
                              className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handleDeleteOrder(order._id)}
                              className="text-red-400 hover:text-red-300 font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900">
                <h2 className="text-2xl font-semibold text-white">
                  Order Details - #{selectedOrder._id?.slice(-6).toUpperCase()}
                </h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info & Payment Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Customer Information</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-2 border border-gray-700">
                      <p className="text-gray-300"><span className="font-medium text-white">Name:</span> {selectedOrder.userId?.name || 'N/A'}</p>
                      <p className="text-gray-300"><span className="font-medium text-white">Email:</span> {selectedOrder.userId?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Shipping Address</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-2 border border-gray-700">
                      <p className="text-gray-300">{selectedOrder.shippingAddress}</p>
                      <p className="text-gray-300">{selectedOrder.city}, {selectedOrder.postalCode}</p>
                      <p className="text-gray-300">{selectedOrder.country}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Payment Information</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-2 border border-gray-700">
                      <p className="text-gray-300"><span className="font-medium text-white">Method:</span> {selectedOrder.paymentMethod?.toUpperCase()}</p>
                      <p className="text-gray-300"><span className="font-medium text-white">Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedOrder.paymentStatus === 'paid' 
                            ? 'bg-green-900 text-green-300 border border-green-700' 
                            : 'bg-orange-900 text-orange-300 border border-orange-700'
                        }`}>
                          {selectedOrder.paymentStatus === 'paid' ? '✓ Paid' : 'Unpaid'}
                        </span>
                      </p>
                      <p><span className="font-medium">Total:</span> NPR {parseFloat(selectedOrder.totalAmount).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Order Date</h3>
                    <p className="text-lg">
                      {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h3>
                    <p className="text-lg capitalize">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Total Amount</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      ${parseFloat(selectedOrder.totalAmount).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedOrder._id, status)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          selectedOrder.status === status
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Order Items</h3>
                  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {selectedOrder.OrderItems?.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-800">
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center">
                                {item.imageUrl && (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-12 h-12 rounded object-cover mr-3"
                                  />
                                )}
                                <span className="font-medium text-white">{item.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-300">${parseFloat(item.price).toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm font-semibold">
                              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => handleDeleteOrder(selectedOrder._id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    Delete Order
                  </button>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
