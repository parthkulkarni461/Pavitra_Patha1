// ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../components/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
 
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Mock product images array - in a real app, this would come from your product data
  const productImages = [
    product.image,
    'https://via.placeholder.com/500x500/f9f4e9/7A5E3A?text=Product+Side+View',
    'https://via.placeholder.com/500x500/f9f4e9/7A5E3A?text=Product+Close+Up',
    'https://via.placeholder.com/500x500/f9f4e9/7A5E3A?text=Product+In+Use'
  ];
  
  return (
    <div style={styles.container}>
      <div style={styles.breadcrumb}>
        <Link to="/" style={styles.breadcrumbLink}>Home</Link>
        <span style={styles.breadcrumbSeparator}>/</span>
        <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} style={styles.breadcrumbLink}>
          {product.category}
        </Link>
        <span style={styles.breadcrumbSeparator}>/</span>
        <span>{product.name}</span>
      </div>
      
      <div style={styles.productContainer}>
        <div style={styles.imageGallery}>
          <div style={styles.mainImage}>
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              style={styles.largeImage} 
            />
          </div>
          <div style={styles.thumbnailContainer}>
            {productImages.map((img, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.thumbnail,
                  border: selectedImage === index ? '2px solid #3A7138' : '2px solid transparent'
                }}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={img} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  style={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.productInfo}>
          <h1 style={styles.productName}>{product.name}</h1>
          
          <div style={styles.ratingContainer}>
            <div style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}>
                  ★
                </span>
              ))}
            </div>
            <span style={styles.reviews}>({product.reviews} reviews)</span>
            <span style={styles.verified}><i className="fas fa-check-circle"></i> Ayurveda Certified</span>
          </div>
          
          <div style={styles.priceContainer}>
            <span style={styles.price}>₹{product.price}</span>
            {product.originalPrice && (
              <span style={styles.originalPrice}>₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span style={styles.discount}>{product.discount}% off</span>
            )}
          </div>
          
          <p style={styles.description}>{product.description}</p>
          
          <div style={styles.detailsSection}>
            <h3 style={styles.sectionTitle}>Product Details</h3>
            <p style={styles.detailText}>{product.details}</p>
          </div>
          
          <div style={styles.detailsSection}>
            <h3 style={styles.sectionTitle}>Ingredients</h3>
            <p style={styles.detailText}>{product.ingredients}</p>
          </div>
          
          <div style={styles.detailsSection}>
            <h3 style={styles.sectionTitle}>Usage Instructions</h3>
            <p style={styles.detailText}>{product.usage}</p>
          </div>
          
          <div style={styles.detailsSection}>
            <h3 style={styles.sectionTitle}>Benefits</h3>
            <p style={styles.detailText}>{product.benefits}</p>
          </div>
          
          <div style={styles.quantityContainer}>
            <span style={styles.quantityLabel}>Quantity:</span>
            <div style={styles.quantitySelector}>
              <button style={styles.quantityButton} onClick={decrementQuantity}>-</button>
              <input 
                type="number" 
                value={quantity} 
                onChange={handleQuantityChange}
                min="1"
                max="10"
                style={styles.quantityInput}
              />
              <button style={styles.quantityButton} onClick={incrementQuantity}>+</button>
            </div>
          </div>
          
          <div style={styles.actionButtons}>
            <button 
              style={styles.addToCartButton}
              onClick={() => addToCart(product, quantity)}
            >
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <Link to="/checkout" state={{ product, quantity }} style={styles.buyNowLink}>
              <button style={styles.buyNowButton}>
                Buy Now
              </button>
            </Link>
          </div>
          
          <div style={styles.guarantee}>
            <div style={styles.guaranteeItem}>
              <i className="fas fa-shield-alt" style={styles.guaranteeIcon}></i>
              <span>100% Authentic Ayurvedic Products</span>
            </div>
            <div style={styles.guaranteeItem}>
              <i className="fas fa-truck" style={styles.guaranteeIcon}></i>
              <span>Free Shipping above ₹500</span>
            </div>
            <div style={styles.guaranteeItem}>
              <i className="fas fa-undo" style={styles.guaranteeIcon}></i>
              <span>Easy 14-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.relatedProducts}>
        <h2 style={styles.relatedTitle}>You May Also Like</h2>
        <div style={styles.relatedGrid}>
          {products
            .filter(p => p.id !== product.id)
            .slice(0, 4)
            .map(related => (
              <div key={related.id} style={styles.relatedCard}>
                <Link to={`/product/${related.id}`} style={styles.relatedLink}>
                  <img src={related.image} alt={related.name} style={styles.relatedImage} />
                  <div style={styles.relatedName}>{related.name}</div>
                  <div style={styles.relatedPrice}>₹{related.price}</div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '0 20px',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#7A5E3A',
  },
  breadcrumbLink: {
    color: '#7A5E3A',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  breadcrumbSeparator: {
    margin: '0 10px',
  },
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '50px',
    gap: '40px',
  },
  imageGallery: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '500px',
  },
  mainImage: {
    backgroundColor: '#f9f4e9',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '15px',
    aspectRatio: '1/1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  thumbnailContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: '110px',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#f9f4e9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border 0.2s ease',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  productInfo: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '600px',
  },
  productName: {
    fontSize: '28px',
    margin: '0 0 15px',
    color: '#42210B',
    fontWeight: '600',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  stars: {
    marginRight: '10px',
  },
  starFilled: {
    color: '#D88E20',
    fontSize: '16px',
  },
  starEmpty: {
    color: '#e0d6c7',
    fontSize: '16px',
  },
  reviews: {
    marginRight: '15px',
    color: '#7A5E3A',
    fontSize: '14px',
  },
  verified: {
    display: 'flex',
    alignItems: 'center',
    color: '#3A7138',
    fontSize: '14px',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  price: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3A7138',
    marginRight: '15px',
  },
  originalPrice: {
    fontSize: '18px',
    color: '#7A5E3A',
    textDecoration: 'line-through',
    marginRight: '15px',
  },
  discount: {
    fontSize: '18px',
    color: '#B53D1A',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#7A5E3A',
    marginBottom: '25px',
  },
  detailsSection: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#42210B',
    margin: '0 0 10px',
    position: 'relative',
    paddingBottom: '5px',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '50px',
      height: '2px',
      backgroundColor: '#D88E20',
    },
  },
  detailText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#7A5E3A',
    margin: 0,
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0',
    flexWrap: 'wrap',
    gap: '15px',
  },
  quantityLabel: {
    marginRight: '15px',
    color: '#42210B',
    fontWeight: '500',
  },
  quantitySelector: {
    display: 'flex',
    border: '1px solid #7A5E3A',
    borderRadius: '4px',
  },
  quantityButton: {
    width: '40px',
    height: '40px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#42210B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#f9f4e9',
    },
  },
  quantityInput: {
    width: '50px',
    height: '40px',
    border: 'none',
    borderLeft: '1px solid #7A5E3A',
    borderRight: '1px solid #7A5E3A',
    textAlign: 'center',
    fontSize: '16px',
    color: '#42210B',
    '&:focus': {
      outline: 'none',
    },
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  addToCartButton: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#3A7138',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    minWidth: '200px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#2D5A2B',
    },
  },
  buyNowButton: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#a72821f4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '200px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#8C201B',
    },
  },
  buyNowLink: {
    flex: 1,
    textDecoration: 'none',
  },
  guarantee: {
    backgroundColor: '#f9f4e9',
    borderRadius: '8px',
    padding: '20px',
  },
  guaranteeItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '14px',
    color: '#7A5E3A',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  guaranteeIcon: {
    marginRight: '10px',
    color: '#D88E20',
    fontSize: '18px',
  },
  relatedProducts: {
    marginTop: '50px',
  },
  relatedTitle: {
    fontSize: '24px',
    color: '#42210B',
    marginBottom: '20px',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: '15px',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '3px',
      backgroundColor: '#D88E20',
    },
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  relatedCard: {
    backgroundColor: '#FFF9F0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    },
  },
  relatedLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  relatedImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    backgroundColor: '#f9f4e9',
  },
  relatedName: {
    padding: '15px',
    fontSize: '15px',
    color: '#42210B',
    fontWeight: '500',
    minHeight: '60px',
  },
  relatedPrice: {
    padding: '0 15px 15px',
    fontSize: '18px',
    color: '#3A7138',
    fontWeight: 'bold',
  },
};

export default ProductDetail;