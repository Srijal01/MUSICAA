import React, { useState } from 'react';
import Button from '../atoms/Button';

/**
 * Advanced Filter Panel
 */
const FilterPanel = ({ onApplyFilters, onReset }) => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100000 },
    rating: 0,
    inStock: false,
    brands: [],
    sortBy: 'popularity'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      priceRange: { min: 0, max: 100000 },
      rating: 0,
      inStock: false,
      brands: [],
      sortBy: 'popularity'
    };
    setFilters(resetFilters);
    onReset();
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Price Range
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange.min}
            onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: parseInt(e.target.value) || 0 })}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-1.5 text-sm"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange.max}
            onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: parseInt(e.target.value) || 100000 })}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-1.5 text-sm"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Minimum Rating
        </label>
        <select
          value={filters.rating}
          onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
          className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2"
        >
          <option value="0">All Ratings</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
          <option value="2">2★ & above</option>
        </select>
      </div>

      {/* In Stock */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="inStock"
          checked={filters.inStock}
          onChange={(e) => handleFilterChange('inStock', e.target.checked)}
          className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
        />
        <label htmlFor="inStock" className="text-sm text-gray-300">
          In Stock Only
        </label>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2"
        >
          <option value="popularity">Popularity</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button variant="primary" size="sm" onClick={handleApply} className="flex-1">
          Apply
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset} className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
