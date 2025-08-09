import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/CartContext'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './components/ProductDetail'; 
import CartPage from './components/CartPage';
import Checkout from './components/Checkout'; 
import CategoryPage from './components/CategoryPage'; 
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import './index.css';
import OrdersPage from './components/OrdersPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import AllProductsPage from './components/AllProductsPage';

// Admin Components
import AdminPanel from './admin/AdminPanel';
import AdminLogin from './admin/AdminLogin';
import AdminLogout from './admin/AdminLogout';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AdminSales from './admin/AdminSales';

// Private Route component for admin authentication
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.isAdmin ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          {/* Header won't show on admin routes */}
          {!window.location.pathname.startsWith('/admin') && <Header />}
          
          <main className="main-content">
            <Routes>
              {/* Core Routes */}
              <Route path="/" element={<Home />} />
              
              {/* Product Routes */}
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<OrdersPage />} />
              
              {/* Category Route */}
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              
              {/* Checkout Flow */}
              <Route exact path="/cart" element={<CartPage />} />
              <Route exact path="/checkout" element={<Checkout />} />
              <Route path="/all-products" element={<AllProductsPage />} />
              
              {/* Information Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/logout" element={<AdminLogout />} />
              
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }>
                <Route index element={<AdminProducts />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="sales" element={<AdminSales />} />
              </Route>
              
              {/* Error Handling - Keep this last */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </main>
          
          {/* Footer won't show on admin routes */}
          {!window.location.pathname.startsWith('/admin') && <Footer />}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;