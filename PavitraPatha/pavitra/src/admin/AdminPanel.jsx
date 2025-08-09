import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './admin.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = () => {
    try {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      
      // Get recent orders (last 5)
      const recentOrders = [...orders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      
      setStats({
        products: products.length,
        orders: orders.length,
        revenue,
        recentOrders
      });
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Products</h3>
            <p>{stats.products}</p>
          </div>
          <div className="stat-card">
            <h3>Orders</h3>
            <p>{stats.orders}</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>₹{stats.revenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <nav>
          <ul className="admin-nav">
            <li><Link to="/admin/products"><i className="fas fa-box"></i> Products</Link></li>
            <li><Link to="/admin/orders"><i className="fas fa-shopping-cart"></i> Orders</Link></li>
            <li><Link to="/admin/sales"><i className="fas fa-chart-line"></i> Sales Reports</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout ({user?.username})
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="admin-content">
        <Outlet context={{ fetchAdminData }} />
      </div>
    </div>
  );
};

export default AdminPanel;