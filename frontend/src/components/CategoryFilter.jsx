import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/categorySlice';
import { fetchProducts, setSelectedCategory } from '../store/productSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { selectedCategory } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchProducts(categoryId));
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange('')}
          className={`px-4 py-2 rounded ${
            selectedCategory === '' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryChange(category._id)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category._id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;