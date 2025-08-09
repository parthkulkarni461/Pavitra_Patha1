import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">Pavitra Patha</h3>
          <p className="footer-text">
            Taking Ayurveda to Every Home with authentic products delivered at your doorstep.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Contact Information</h3>
          <ul className="footer-list">
            <li className="footer-list-item">
              <FaMapMarkerAlt className="footer-icon" />
              Maharashtra, India
            </li>
            <li className="footer-list-item">
              <FaPhone className="footer-icon" />
              +91 0000000000
            </li>
            <li className="footer-list-item">
              <FaEnvelope className="footer-icon" />
              info@pavitrapatha.com
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Follow Us On</h3>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaPinterest /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Our Company</h3>
          <ul className="footer-list">
            <li className="footer-list-item">
  <Link to="/" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
    Home
  </Link>
</li>
            <li className="footer-list-item"><Link to="/about" className="footer-link">About Us</Link></li>
            <li className="footer-list-item"><Link to="/contact" className="footer-link">Contact Us</Link></li>
            <li className="footer-list-item"><Link to="/faq" className="footer-link">FAQ</Link></li>
          </ul>
        </div>
      </div>

      <div className="subscribe-container">
        <div className="subscribe-content">
          <h4 className="subscribe-title">Subscribe for Updates</h4>
          <div className="subscribe-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="subscribe-input"
            />
            <button className="subscribe-button">SUBSCRIBE</button>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} Pavitra Patha. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;