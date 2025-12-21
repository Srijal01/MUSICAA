// Product Service
import api from '../utils/api';

export const productService = {
  getAllProducts: async (main = '', sub = '') => {
    let url = '/products';
    const params = [];
    if (main) params.push(`main=${encodeURIComponent(main)}`);
    if (sub) params.push(`sub=${encodeURIComponent(sub)}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    
    const response = await api.get(url);
    return response.data;
  },
  
  getAllCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },
  
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};
