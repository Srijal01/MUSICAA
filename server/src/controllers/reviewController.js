const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Get all reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;

    const reviews = await Review.find({ product: productId })
      .populate('user', 'name')
      .sort({ [sortBy]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Review.countDocuments({ product: productId });

    // Calculate average rating
    const avgRating = await Review.aggregate([
      { $match: { product: mongoose.Types.ObjectId(productId) } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalReviews: total,
      averageRating: avgRating[0]?.avgRating || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, title, comment } = req.body;
    const userId = req.user._id;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ product: productId, user: userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Check if user purchased this product (optional - for verified purchase)
    const hasPurchased = await Order.findOne({
      user: userId,
      'items.product': productId,
      status: 'Delivered'
    });

    const review = new Review({
      product: productId,
      user: userId,
      rating,
      title,
      comment,
      verified: !!hasPurchased
    });

    await review.save();

    // Update product average rating
    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(productId, {
      averageRating: avgRating,
      reviewCount: reviews.length
    });

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, title, comment } = req.body;
    const userId = req.user._id;

    const review = await Review.findOne({ _id: reviewId, user: userId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;

    await review.save();

    // Update product average rating
    const reviews = await Review.find({ product: review.product });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(review.product, {
      averageRating: avgRating
    });

    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    // Update product rating count
    const reviews = await Review.find({ product: review.product });
    const avgRating = reviews.length > 0 
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length 
      : 0;
    
    await Product.findByIdAndUpdate(review.product, {
      averageRating: avgRating,
      reviewCount: reviews.length
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

// Mark review as helpful
exports.markHelpful = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.helpfulBy.includes(userId)) {
      return res.status(400).json({ message: 'Already marked as helpful' });
    }

    review.helpful += 1;
    review.helpfulBy.push(userId);
    await review.save();

    res.json({ message: 'Marked as helpful', helpful: review.helpful });
  } catch (error) {
    res.status(500).json({ message: 'Error marking review as helpful', error: error.message });
  }
};
