import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import '../components/Header.css';
import { useCart } from '../components/CartContext';

// SVG Icons Components
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

const AccountPopup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGoogleLogin = () => {
    console.log('Google login initiated');
    // Implement actual Google OAuth here
    // Typically would redirect to Google's OAuth service
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password && !showOtpField) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6 && !showOtpField) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.phone) {
        newErrors.phone = 'Phone is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone must be 10 digits';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (showOtpField && !otp) {
      newErrors.otp = 'OTP is required';
    } else if (showOtpField && !/^\d{6}$/.test(otp)) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, only allow numbers
    if (name === 'phone') {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > 6) return;
    
    setOtp(value);
    if (errors.otp) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.otp;
        return newErrors;
      });
    }
  };

  const sendOtp = () => {
    if (!formData.phone) {
      setErrors({ phone: 'Phone is required to send OTP' });
      return;
    }
    
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrors({ phone: 'Phone must be 10 digits' });
      return;
    }
    
    console.log('OTP sent to:', formData.phone);
    setOtpSent(true);
    setShowOtpField(true);
    setCountdown(30);
  };

  const resendOtp = () => {
    console.log('Resending OTP to:', formData.phone);
    setCountdown(30);
  };

  const verifyOtp = () => {
    if (!otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }
    
    if (!/^\d{6}$/.test(otp)) {
      setErrors({ otp: 'OTP must be 6 digits' });
      return;
    }
    
    console.log('Verifying OTP:', otp, 'for phone:', formData.phone);
    setIsMobileVerified(true);
    setShowOtpField(false);
    alert('Mobile number verified successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (showOtpField && !isMobileVerified) {
        verifyOtp();
      } else if (isLogin) {
        console.log('Login submitted:', { 
          email: formData.email, 
          password: formData.password 
        });
      } else {
        console.log('Signup submitted:', {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          password: formData.password,
          isMobileVerified
        });
      }
    }
  };

  return (
    <div className="account-popup">
      <div className="account-popup-content">
        <button className="close-popup" onClick={onClose}>
          <CloseIcon />
        </button>
        
        <h3>{isLogin ? 'Login to Your Account' : 'Create New Account'}</h3>
        
        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
              
              <div className="form-group">
                <div className="phone-input-container">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter your phone number"
                    disabled={isMobileVerified}
                  />
                  {!isMobileVerified && formData.phone && (
                    <button 
                      type="button" 
                      className="send-otp-button"
                      onClick={otpSent ? resendOtp : sendOtp}
                      disabled={countdown > 0}
                    >
                      {otpSent ? 
                        (countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP') : 
                        'Send OTP'}
                    </button>
                  )}
                </div>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
                {isMobileVerified && (
                  <span className="verified-badge">Verified ✓</span>
                )}
              </div>
            </>
          )}
          
          {showOtpField && !isMobileVerified && (
            <div className="form-group">
              <div className="otp-input-container">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter 6-digit OTP"
                  className={errors.otp ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="verify-otp-button"
                  onClick={verifyOtp}
                >
                  Verify
                </button>
              </div>
              {errors.otp && <span className="error-message">{errors.otp}</span>}
              <p className="otp-instruction">
                We've sent a 6-digit OTP to +91 {formData.phone}
              </p>
            </div>
          )}
          
          {!showOtpField && (
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder={isLogin ? "Enter your password" : "Create a password (min 6 characters)"}
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
          )}
          
          {!isLogin && !showOtpField && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}
          
          <button type="submit" className="submit-btn">
            {showOtpField && !isMobileVerified ? 'Verify OTP' : 
             isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        {isLogin && (
          <>
            <div className="divider">
              <span>OR</span>
            </div>

            <div className="social-login-buttons">
              <button 
                className="social-button google-button"
                onClick={handleGoogleLogin}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.137-2.682-6.735-2.682-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </>
        )}
        
        <div className="auth-switch">
          {isLogin ? (
            <>
              <p>Don't have an account?</p>
              <button onClick={() => {
                setIsLogin(false);
                setShowOtpField(false);
                setIsMobileVerified(false);
                setOtpSent(false);
              }}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button onClick={() => {
                setIsLogin(true);
                setShowOtpField(false);
                setIsMobileVerified(false);
                setOtpSent(false);
              }}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
      <div className="account-popup-overlay" onClick={onClose}></div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [showOrganicDropdown, setShowOrganicDropdown] = useState(false);
  const [showAgnihotraDropdown, setShowAgnihotraDropdown] = useState(false);
  const [showAllProductsDropdown, setShowAllProductsDropdown] = useState(false);
  const navigate = useNavigate();
  const { cartItemCount } = useCart();

  const organicProducts = [
    { id: 'organic-ghee', name: "Organic Ghee", categories: ["Pure", "Cold Pressed"] },
    { id: 'organic-incense', name: "Organic Incense", categories: ["Natural", "Herbal"] }
  ];

  const agnihotraProducts = [
    { id: 'agnihotra-kit', name: "Agnihotra Kit", categories: ["Complete Set", "Copper Pyramid"] },
    { id: 'agnihotra-ghee', name: "Agnihotra Ghee", categories: ["Special", "Ritual Grade"] }
  ];

  const allProducts = [
    { id: 'organic-ghee', name: "Organic Ghee", categories: ["Pure", "Cold Pressed"], path: "/products/A2 Desi Cow Ghee" },
    { id: 'organic-incense', name: "Organic Incense", categories: ["Natural", "Herbal"], path: "/products/Health & Wellness" },
    { id: 'agnihotra-kit', name: "Agnihotra Kit", categories: ["Complete Set", "Copper Pyramid"], path: "/products/agnihotra-kit" },
    { id: 'agnihotra-ghee', name: "Agnihotra Ghee", categories: ["Special", "Ritual Grade"], path: "/products/agnihotra-ghee" },
    { id: 'herbal-teas', name: "Herbal Teas", categories: ["Organic", "Ayurvedic"], path: "/products/herbal-teas" },
    { id: 'natural-oils', name: "Natural Oils", categories: ["Essential", "Therapeutic"], path: "/products/natural-oils" }
  ];

  const productBrands = [...organicProducts, ...agnihotraProducts, ...allProducts];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccountPopup = (e) => {
    e.preventDefault();
    setShowAccountPopup(!showAccountPopup);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    setShowOrganicDropdown(false);
    setShowAgnihotraDropdown(false);
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="Pavitra Patha Logo" className="logo" />
        </Link>

        {/* Organic Dropdown */}
        <div 
          className="products-dropdown-container"
          onMouseEnter={() => setShowOrganicDropdown(true)}
          onMouseLeave={() => setShowOrganicDropdown(false)}
        >
          <button className="products-dropdown-button">
            Organic <ChevronDownIcon />
          </button>
          
          {showOrganicDropdown && (
            <div className="products-dropdown">
              {organicProducts.map((brand) => (
                <div key={brand.id} className="brand-item">
                  <h4 
                    className="brand-name clickable"
                    onClick={() => handleProductClick(brand.id)}
                  >
                    {brand.name}
                  </h4>
                  <div className="brand-categories">
                    {brand.categories.map((category, catIndex) => (
                      <span key={catIndex} className="category-tag">{category}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agnihotra Dropdown */}
        <div 
          className="products-dropdown-container"
          onMouseEnter={() => setShowAgnihotraDropdown(true)}
          onMouseLeave={() => setShowAgnihotraDropdown(false)}
        >
          <button className="products-dropdown-button">
            Agnihotra <ChevronDownIcon />
          </button>
          
          {showAgnihotraDropdown && (
            <div className="products-dropdown">
              {agnihotraProducts.map((brand) => (
                <div key={brand.id} className="brand-item">
                  <h4 
                    className="brand-name clickable"
                    onClick={() => handleProductClick(brand.id)}
                  >
                    {brand.name}
                  </h4>
                  <div className="brand-categories">
                    {brand.categories.map((category, catIndex) => (
                      <span key={catIndex} className="category-tag">{category}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Products Dropdown */}
        {/* All Products Link */}
<Link to="/all-products" className="products-dropdown-button">
  All Products
</Link>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
          />
          <button className="search-button">
            <SearchIcon />
          </button>
        </div>
        
        <div className="icons-container">
          <a href="#" className="nav-link" onClick={toggleAccountPopup}>
            <PersonIcon />
            <span>Account</span>
          </a>
          
          <Link to="/cart" className="nav-link cart-link">
            <ShoppingCartIcon />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-count">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="mobile-search-container">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
          />
          <button className="search-button">
            <SearchIcon />
          </button>
        </div>
      )}
      
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-products">
            <h4>All Products</h4>
            {productBrands.map((brand) => (
              <div key={brand.id} className="mobile-brand-item">
                <h5 
                  className="clickable"
                  onClick={() => handleProductClick(brand.id)}
                >
                  {brand.name}
                </h5>
                <div className="mobile-brand-categories">
                  {brand.categories.map((category, catIndex) => (
                    <span key={catIndex}>{category}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="mobile-menu-link" onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            setShowAccountPopup(true);
          }}>
            My Account
          </a>
          <Link to="/cart" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
            My Cart ({cartItemCount})
          </Link>
          <Link to="/shop" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
            Shop All
          </Link>
          <Link to="/about" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
            About Us
          </Link>
        </div>
      )}
      
      {showAccountPopup && <AccountPopup onClose={() => setShowAccountPopup(false)} />}
    </header>
  );
};

export default Header;