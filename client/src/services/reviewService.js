import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all reviews for a product
export const getProductReviews = async (productId, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/product/${productId}`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create a review
export const createReview = async (productId, reviewData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/reviews/product/${productId}`,
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update a review
export const updateReview = async (reviewId, reviewData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/reviews/${reviewId}`,
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Mark review as helpful
export const markReviewHelpful = async (reviewId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/reviews/${reviewId}/helpful`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  markReviewHelpful
};
