import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    
    // Optional: Show a notification or feedback to user
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product);
    
    // Redirect to checkout with the single product
    window.location.href = '/checkout';
  };

  return (
    <div style={styles.card}>
      {product.rating > 4.4 && (
        <div style={styles.bestsellerTag}>Bestseller</div>
      )}
      
      <Link to={`/product/${product.id}`} style={styles.imageLink}>
        <div style={styles.imageContainer}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={styles.image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-product.jpg';
            }}
          />
        </div>
      </Link>
      
      <div style={styles.content}>
        <Link to={`/product/${product.id}`} style={styles.nameLink}>
          <h3 style={styles.name}>{product.name}</h3>
        </Link>
        
        <div style={styles.priceContainer}>
          <span style={styles.price}>₹{product.price}</span>
          {product.originalPrice && (
            <span style={styles.originalPrice}>₹{product.originalPrice}</span>
          )}
          {product.discount && (
            <span style={styles.discount}>{product.discount}% off</span>
          )}
        </div>
        
        <div style={styles.ratingContainer}>
          <div style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}>
                ★
              </span>
            ))}
          </div>
          <span style={styles.reviews}>({product.reviews} reviews)</span>
        </div>
        
        <div style={styles.category}>{product.category}</div>
        
        <div style={styles.buttonContainer}>
          <button 
            style={styles.addToCartButton}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button 
            style={styles.buyNowButton}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#FFF9F0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    position: 'relative',
    border: '1px solid #eae0d5',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    },
    '&:hover $image': {
      transform: 'scale(1.05)',
    },
    '&:hover $name': {
      color: '#D88E20',
    },
  },
  bestsellerTag: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#B53D1A',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    zIndex: 2,
  },
  imageContainer: {
    height: '200px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f9f4e9',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  imageLink: {
    textDecoration: 'none',
    display: 'block',
  },
  nameLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  content: {
    padding: '15px',
  },
  name: {
    fontSize: '16px',
    margin: '0 0 10px',
    color: '#42210B',
    minHeight: '40px',
    transition: 'color 0.3s',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#3A7138',
    marginRight: '10px',
  },
  originalPrice: {
    fontSize: '14px',
    color: '#7A5E3A',
    textDecoration: 'line-through',
    marginRight: '10px',
  },
  discount: {
    fontSize: '14px',
    color: '#B53D1A',
    fontWeight: 'bold',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  stars: {
    marginRight: '8px',
  },
  starFilled: {
    color: '#D88E20',
    fontSize: '14px',
  },
  starEmpty: {
    color: '#e0d6c7',
    fontSize: '14px',
  },
  reviews: {
    fontSize: '12px',
    color: '#7A5E3A',
  },
  category: {
    fontSize: '12px',
    color: '#7A5E3A',
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  addToCartButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#3A7138',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#2D5A2B',
    },
  },
  buyNowButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#d82f20ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#C07D1A',
    },
  },
};

export default ProductCard;