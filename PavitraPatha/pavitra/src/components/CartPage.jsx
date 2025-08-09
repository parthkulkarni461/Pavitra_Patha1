import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart, 
    cartItemCount,
    cartTotal 
  } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems !== undefined) {
      setIsLoading(false);
    }
  }, [cartItems]);

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cartItemCount === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Your Shopping Cart</h1>
        <div style={styles.emptyCart}>
          <i className="fas fa-shopping-cart" style={styles.cartIcon}></i>
          <p style={styles.emptyText}>Your cart is currently empty</p>
          <div style={styles.emptyCartButtons}>
            <Link to="/" style={styles.continueButton}>Continue Shopping</Link>
            <Link to="/orders" style={styles.viewOrdersButton}>View Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Shopping Cart ({cartItemCount} items)</h1>
      
      <div style={styles.cartContainer}>
        <div style={styles.cartItems}>
          {cartItems.map(item => (
            <div key={`${item.id}-${item.quantity}`} style={styles.cartItem}>
              <div style={styles.itemImage}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={styles.productImage} 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/placeholder-product.jpg'
                  }}
                />
              </div>
              <div style={styles.itemDetails}>
                <Link to={`/product/${item.id}`} style={styles.itemName}>
                  {item.name}
                </Link>
                <p style={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
                <div style={styles.quantityControl}>
                  <button 
                    style={styles.quantityButton}
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button 
                    style={styles.quantityButton}
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  style={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <div style={styles.itemTotal}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        <div style={styles.cartSummary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          <div style={styles.summaryRow}>
            <span>Subtotal ({cartItemCount} items)</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>{cartTotal > 500 ? 'FREE' : '₹50.00'}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Estimated Total</span>
            <span>₹{(cartTotal > 500 ? cartTotal : cartTotal + 50).toFixed(2)}</span>
          </div>
          <button
            onClick={handleProceedToCheckout}
            style={styles.checkoutButton}
          >
            Proceed to Checkout
          </button>
          <button 
            style={styles.clearCartButton}
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <Link to="/orders" style={styles.viewOrdersLink}>
            <button style={styles.viewOrdersButton}>
              View Your Orders
            </button>
          </Link>
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
    minHeight: '60vh',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    gap: '20px',
  },
  loadingSpinner: {
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3A7138',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
  title: {
    fontSize: '28px',
    color: '#42210B',
    marginBottom: '30px',
    borderBottom: '1px solid #eae0d5',
    paddingBottom: '15px',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '50px 20px',
    backgroundColor: '#FFF9F0',
    borderRadius: '8px',
    border: '1px solid #eae0d5',
  },
  cartIcon: {
    fontSize: '60px',
    color: '#D88E20',
    marginBottom: '20px',
  },
  emptyText: {
    fontSize: '20px',
    color: '#7A5E3A',
    marginBottom: '30px',
  },
  emptyCartButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  continueButton: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#3A7138',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#2D5A2B',
    }
  },
  viewOrdersButton: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#D88E20',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#C07D1A',
    }
  },
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
    },
  },
  cartItems: {
    flex: 2,
  },
  cartItem: {
    display: 'flex',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#FFF9F0',
    borderRadius: '8px',
    border: '1px solid #eae0d5',
    position: 'relative',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    }
  },
  itemImage: {
    width: '120px',
    height: '120px',
    marginRight: '20px',
    '@media (max-width: 600px)': {
      width: '100%',
      height: 'auto',
      marginRight: '0',
      marginBottom: '15px',
    }
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '18px',
    margin: '0 0 10px',
    color: '#42210B',
    textDecoration: 'none',
    display: 'block',
    '&:hover': {
      color: '#7A5E3A',
      textDecoration: 'underline',
    }
  },
  itemPrice: {
    fontSize: '16px',
    color: '#3A7138',
    margin: '0 0 10px',
    fontWeight: 'bold',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    margin: '15px 0',
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    backgroundColor: '#eae0d5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '&:hover:not(:disabled)': {
      backgroundColor: '#D88E20',
      color: 'white',
    }
  },
  quantity: {
    margin: '0 15px',
    fontSize: '16px',
    minWidth: '20px',
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#B53D1A',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
    padding: '5px 0',
    '&:hover': {
      color: '#8C2D0F',
    }
  },
  itemTotal: {
    width: '100px',
    textAlign: 'right',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#42210B',
    '@media (max-width: 600px)': {
      position: 'absolute',
      right: '20px',
      bottom: '20px',
    }
  },
  cartSummary: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#FFF9F0',
    borderRadius: '8px',
    border: '1px solid #eae0d5',
    height: 'fit-content',
    position: 'sticky',
    top: '20px',
  },
  summaryTitle: {
    fontSize: '20px',
    color: '#42210B',
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eae0d5',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '16px',
    color: '#7A5E3A',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#42210B',
    paddingTop: '15px',
    borderTop: '1px solid #eae0d5',
  },
  checkoutButton: {
  display: 'block',
  width: '30%', // Changed from '100%' to 'auto'
  padding: '15px 30px',
  backgroundColor: '#3A7138',
  color: 'white',
  textAlign: 'center',
  textDecoration: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '15px',
  transition: 'background-color 0.3s',
  marginLeft: 'auto', // This pushes the button to the right
  '&:hover': {
    backgroundColor: '#2D5A2B',
  }
},
  clearCartButton: {
    display: 'block',
    width: '30%',
    padding: '15px',
    backgroundColor: '#B53D1A',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    marginLeft: 'auto',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#8C2D0F',
    }
  },
  viewOrdersLink: {
    display: 'block',
    width: '100%',
    textDecoration: 'none',
    marginTop: '15px',
  },
  viewOrdersButton: {
    display: 'block',
    width: '30%',
    padding: '15px',
    backgroundColor: '#D88E20',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginLeft: 'auto',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#C07D1A',
    }
  }
};

export default CartPage;