import { useState } from 'react';

function CategorySidebar({ categories, selectedMain, selectedSub, onFilterChange }) {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (categoryName) => {
    if (expandedCategories.includes(categoryName)) {
      setExpandedCategories(expandedCategories.filter(c => c !== categoryName));
    } else {
      setExpandedCategories([...expandedCategories, categoryName]);
    }
  };

  const handleMainClick = (mainCategory) => {
    onFilterChange(mainCategory, '');
    // Auto-expand when selecting main category
    if (!expandedCategories.includes(mainCategory)) {
      setExpandedCategories([...expandedCategories, mainCategory]);
    }
  };

  const handleSubClick = (mainCategory, subCategory) => {
    onFilterChange(mainCategory, subCategory);
  };

  return (
    <div className="glass rounded-2xl p-6 sticky top-24 border border-white/10 card-shadow">
      <h2 className="text-2xl font-bold gradient-text mb-6 pb-4 border-b border-white/10">
        Departments
      </h2>
      
      <button
        onClick={() => onFilterChange('', '')}
        className={`w-full text-left px-4 py-3 rounded-xl mb-3 font-semibold transition-all ${
          !selectedMain && !selectedSub
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
            : 'text-gray-300 hover:bg-white/5'
        }`}
      >
        🎵 View All
      </button>

      <div className="space-y-1">
        {categories.map((category, idx) => (
          <div key={idx} className="border-b border-gray-800 last:border-b-0 py-1">
            {/* Main Category */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleMainClick(category.name)}
                className={`flex-1 text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  selectedMain === category.name && !selectedSub
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {category.name}
              </button>
              <button
                onClick={() => toggleCategory(category.name)}
                className="p-2 hover:bg-white/5 hover:scale-110 active:scale-95 rounded-lg transition-all duration-200"
              >
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedCategories.includes(category.name) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Subcategories */}
            {expandedCategories.includes(category.name) && (
              <div className="ml-3 mt-1 space-y-1">
                {category.subcategories.map((sub, subIdx) => (
                  <button
                    key={subIdx}
                    onClick={() => handleSubClick(category.name, sub)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedMain === category.name && selectedSub === sub
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySidebar;
