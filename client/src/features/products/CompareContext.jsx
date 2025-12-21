import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
};

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const MAX_COMPARE = 4;

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) {
      setCompareList(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    if (compareList.length >= MAX_COMPARE) {
      return { success: false, message: `You can compare up to ${MAX_COMPARE} products` };
    }
    
    const exists = compareList.find(item => item._id === product._id);
    if (exists) {
      return { success: false, message: 'Product already in compare list' };
    }

    setCompareList(prev => [...prev, product]);
    return { success: true, message: 'Product added to compare' };
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(item => item._id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId) => {
    return compareList.some(item => item._id === productId);
  };

  const value = {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareCount: compareList.length,
    maxCompare: MAX_COMPARE,
    canAddMore: compareList.length < MAX_COMPARE
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};

export default CompareContext;
