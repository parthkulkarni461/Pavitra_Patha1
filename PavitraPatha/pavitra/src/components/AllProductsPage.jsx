import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import '../components/AllProductsPage.css';
import { useCart } from '../components/CartContext';

const AllProductsPage = () => {
  const [sortOption, setSortOption] = useState('default');
  const [filterOption, setFilterOption] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState([...products]);
  const { addToCart } = useCart();

  // Apply sorting and filtering whenever options change
  useEffect(() => {
    let result = [...products];
    
    // Apply filter
    if (filterOption !== 'all') {
      result = result.filter(product => 
        product.category.toLowerCase().includes(filterOption.toLowerCase())
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Default sorting (by ID)
        result.sort((a, b) => a.id - b.id);
    }
    
    setDisplayedProducts(result);
  }, [sortOption, filterOption]);

  // Get unique categories for filter dropdown
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="all-products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <div className="sort-filter-container">
          <div className="filter-section">
            <label htmlFor="category-filter">Filter by Category:</label>
            <select 
              id="category-filter"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="sort-section">
            <label htmlFor="sort-option">Sort by:</label>
            <select 
              id="sort-option"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-grid">
        {displayedProducts.map((product) => (
  <div key={product.id} className="product-card">
    <Link to={`/product/${product.id}`} className="product-link">  
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/images/placeholder-product.jpg';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">
          {product.name.length > 50 
            ? `${product.name.substring(0, 50)}...` 
            : product.name
          }
        </h3>
        <div className="product-price">₹{product.price}</div>
        <div className="product-rating">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span className="review-count">({product.reviews})</span>
        </div>
        <div className="product-category">
          {product.category.toUpperCase()}
        </div>
      </div>
    </Link>
    <button 
              className="add-to-cart-btn"
              onClick={() => addToCart(product, 1)} // Add product to cart with quantity 1
            >
              Add to Cart
            </button>
  </div>
))}
      </div>
    </div>
  );
};

export default AllProductsPage;