import React from 'react';
import { Link } from 'react-router-dom';
import '../components/CategorySection.css';

const CategorySection = ({ categories }) => {
  return (
    <section className="category-section">
      <div className="section-header">
        <h2 className="section-title">Top Categories</h2>
      </div>
      
      <div className="categories-grid">
        {categories.map((category, index) => (
          <Link 
            to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
            key={index} 
            className="category-card"
          >
            <img 
              src={category.image} 
              alt={category.name}
              className="category-image"
            />
            <h3 className="category-title">{category.name}</h3>
            <p className="category-count">{category.count} products</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;