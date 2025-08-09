import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { state } = useLocation();
  const { cartItems } = state || {};
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('previousOrders');
    if (storedOrders) {
      setPreviousOrders(JSON.parse(storedOrders));
    }

    if (!cartItems || cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const order = {
      id: Date.now(),
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      customerInfo: { ...formData },
      date: new Date().toLocaleDateString(),
      status: 'Processing'
    };
    
    const updatedOrders = [order, ...previousOrders];
    setPreviousOrders(updatedOrders);
    localStorage.setItem('previousOrders', JSON.stringify(updatedOrders));
    
    localStorage.removeItem('cart');
    navigate('/order-confirmation', { state: { order } });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-container empty-cart">
        <div className="checkout-error">
          <h2 className="error-title">Your Cart is Empty</h2>
          <p>Please add items to your cart before checkout</p>
          <button 
            onClick={() => navigate('/')}
            className="continue-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="checkout-container">
      <h1 className="checkout-heading">Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-left-column">
          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.quantity}`} className="product-card">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="product-image" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
                <div className="product-details">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-price">₹{item.price.toFixed(2)} × {item.quantity}</p>
                  <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            
            <div className="order-total">
              <p className="total-price">Total: ₹{totalPrice.toFixed(2)}</p>
            </div>
     
              
              <div className="orders-list">
                {previousOrders.slice(0, 1).map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">Order #{order.id.toString().slice(-6)}</span>
                      <span className="order-date">{order.date}</span>
                      <span className="order-status">{order.status}</span>
                    </div>
                    {(order.items || []).slice(0, 1).map(item => (
                      <div key={item.id} className="order-product">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="order-product-image" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-product.jpg';
                          }}
                        />
                        <div>
                          <p className="order-product-name">{item.name}</p>
                          <p className="order-quantity">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items && order.items.length > 1 && (
                      <p className="more-items">+ {order.items.length - 1} more items</p>
                    )}
                    <p className="order-total">Total: ₹{order.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          
        </div>
        
        <div className="form-section">
          <h2 className="section-title">Shipping Information</h2>
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Full Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-textarea"
                required
                rows="3"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group-half">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group-half">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <h2 className="section-title">Payment Method</h2>
            
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={formData.paymentMethod === 'creditCard'}
                  onChange={handleChange}
                  className="payment-radio"
                />
                <span>Credit Card</span>
              </label>
              
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={formData.paymentMethod === 'UPI'}
                  onChange={handleChange}
                  className="payment-radio"
                />
                <span>UPI</span>
              </label>
              
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="payment-radio"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
            
            {formData.paymentMethod === 'creditCard' && (
              <div className="card-details">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group-half">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group-half">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            <button type="submit" className="submit-button">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;