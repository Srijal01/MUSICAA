// Feature Exports - Centralized Exports

// Wishlist
export { WishlistProvider, useWishlist } from './wishlist/WishlistContext';
export { default as WishlistPage } from './wishlist/WishlistPage';

// Product Comparison
export { CompareProvider, useCompare } from './products/CompareContext';
export { default as CompareProductsPage } from './products/CompareProductsPage';

// Reviews
export { default as ProductReviews } from './reviews/ProductReviews';

// Usage Example:
// import { WishlistProvider, useWishlist } from './features';
