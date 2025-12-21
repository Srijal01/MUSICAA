import React, { useState } from 'react';
import Button from '../../ui/atoms/Button';
import Rating from '../../ui/atoms/Rating';
import Badge from '../../ui/atoms/Badge';

/**
 * Product Review Component
 */
const ProductReviews = ({ productId, reviews = [] }) => {
  const [userReview, setUserReview] = useState({
    rating: 5,
    comment: '',
    title: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // API call would go here
    console.log('Submitting review:', { productId, ...userReview });
    setShowReviewForm(false);
    setUserReview({ rating: 5, comment: '', title: '' });
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          Write a Review
        </Button>
      </div>

      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">
            {averageRating.toFixed(1)}
          </div>
          <Rating value={averageRating} size="lg" />
          <p className="text-gray-400 mt-2">{reviews.length} reviews</p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-gray-400 w-8">{star}★</span>
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-400 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Write Your Review</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating
            </label>
            <Rating
              value={userReview.rating}
              readOnly={false}
              size="lg"
              onChange={(rating) => setUserReview({ ...userReview, rating })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Review Title
            </label>
            <input
              type="text"
              value={userReview.title}
              onChange={(e) => setUserReview({ ...userReview, title: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2"
              placeholder="Best guitar ever!"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Review
            </label>
            <textarea
              value={userReview.comment}
              onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 h-32"
              placeholder="Share your experience with this product..."
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" variant="primary">Submit Review</Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-800 pb-4 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{review.userName}</span>
                    {review.verified && (
                      <Badge variant="success" size="sm">Verified Purchase</Badge>
                    )}
                  </div>
                  <Rating value={review.rating} size="sm" />
                </div>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              <h4 className="font-semibold text-white mb-2">{review.title}</h4>
              <p className="text-gray-300">{review.comment}</p>
              
              {/* Helpful buttons */}
              <div className="flex items-center gap-4 mt-3">
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  👍 Helpful ({review.helpful || 0})
                </button>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
