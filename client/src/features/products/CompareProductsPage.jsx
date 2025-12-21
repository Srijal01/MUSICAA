import React from 'react';
import { useCompare } from './CompareContext';
import Button from '../../ui/atoms/Button';
import Card from '../../ui/atoms/Card';
import { Link } from 'react-router-dom';

const CompareProductsPage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto text-center py-16">
          <svg
            className="w-24 h-24 mx-auto text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <h2 className="text-3xl font-bold mb-4">No Products to Compare</h2>
          <p className="text-gray-400 mb-8">Add products to compare their features</p>
          <Link to="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    { key: 'price', label: 'Price', format: (val) => `NPR ${val?.toLocaleString()}` },
    { key: 'category', label: 'Category', format: (val) => val?.main || val },
    { key: 'stock', label: 'Stock', format: (val) => val > 0 ? `${val} units` : 'Out of Stock' },
    { key: 'specifications.brand', label: 'Brand', format: (val) => val || 'N/A' },
    { key: 'specifications.color', label: 'Color', format: (val) => val || 'N/A' },
    { key: 'description', label: 'Description', format: (val) => val }
  ];

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Compare Products ({compareList.length})</h1>
          {compareList.length > 0 && (
            <Button variant="danger" size="sm" onClick={clearCompare}>
              Clear All
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-900 border border-gray-800 p-4 text-left sticky left-0 z-10">
                  Feature
                </th>
                {compareList.map((product) => (
                  <th key={product._id} className="bg-gray-900 border border-gray-800 p-4 min-w-[250px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(product._id)}
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={product.imageUrl || '/placeholder.jpg'}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-white hover:text-purple-500 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map(({ key, label, format }) => (
                <tr key={key}>
                  <td className="bg-gray-900 border border-gray-800 p-4 font-semibold sticky left-0 z-10">
                    {label}
                  </td>
                  {compareList.map((product) => (
                    <td key={product._id} className="bg-gray-800 border border-gray-700 p-4 text-gray-300">
                      {format(getNestedValue(product, key))}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="bg-gray-900 border border-gray-800 p-4 font-semibold sticky left-0 z-10">
                  Action
                </td>
                {compareList.map((product) => (
                  <td key={product._id} className="bg-gray-800 border border-gray-700 p-4">
                    <Button variant="primary" size="sm" className="w-full">
                      Add to Cart
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareProductsPage;
