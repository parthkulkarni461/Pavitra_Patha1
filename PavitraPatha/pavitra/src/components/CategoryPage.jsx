import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../components/CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');

  useEffect(() => {
    // Format the category name for display
    const formattedName = categoryName.replace(/-/g, ' ');
    setCategoryTitle(formattedName);

    // Filter products based on category
    const filteredProducts = products.filter(product => 
      product.category.toLowerCase() === formattedName.toLowerCase()
    );
    setCategoryProducts(filteredProducts);
  }, [categoryName]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">{categoryTitle}</h1>
        <p className="category-count">{categoryProducts.length} products available</p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="products-grid">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;