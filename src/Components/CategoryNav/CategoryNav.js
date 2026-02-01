import React from 'react';
import './CategoryNav.css';

const CategoryNav = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="categories-container">
      <div className="categories-scroll">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;