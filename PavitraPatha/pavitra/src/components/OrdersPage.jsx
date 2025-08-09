// OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('previousOrders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="checkout-container empty-cart">
        <div className="checkout-error">
          <h2 className="error-title">No Orders Found</h2>
          <p>You haven't placed any orders yet</p>
          <Link to="/" className="continue-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-heading">Your Orders</h1>
      
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order.id.toString().slice(-6)}</span>
              <span className="order-date">{order.date}</span>
              <span className="order-status">{order.status}</span>
            </div>
            {(order.items || []).map(item => (
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
                  <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <p className="order-total">Total: ₹{order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;