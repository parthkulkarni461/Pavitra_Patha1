import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';
import Testimonial from '../components/Testimonial';
import { products } from '../data/products';
import '../pages/Home.css';


// Import category icons
import incenseConeIcon from '../assets/icons/incense-cone.webp';
import incenseStickIcon from '../assets/icons/incense-sticks.webp';
import agnihotraIcon from '../assets/icons/agnihotra.webp';
import sambraniIcon from '../assets/icons/sambrani-cups.webp';
import mandalaIcon from '../assets/icons/mandala.webp';

// Import banner images
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';
const Home = () => {
  const [featuredProducts] = useState(products.slice(0, 4));
  const [bestSellers] = useState(products.filter(p => p.rating > 4.4));
  const [newArrivals] = useState(products.slice(2, 6));
  const [currentBanner, setCurrentBanner] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const banners = [banner3, banner2,];

  // Auto-rotate banners every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { 
      name: "Incense Cones", 
      image: incenseConeIcon,
      count: products.filter(p => p.category.toLowerCase().includes("incense cones")).length,
      // tagline: "INCENSE CONES"
    },
    { 
      name: "Incense Sticks", 
      image: incenseStickIcon,
      count: products.filter(p => p.category.toLowerCase().includes("incense sticks")).length,
      // tagline: "INCENSE STICKS"
    },
    { 
      name: "Agnihotra Kit", 
      image: agnihotraIcon,
      count: products.filter(p => p.category.toLowerCase().includes("agnihotra")).length,
      // tagline: "AGNIHOTRA"
    },
    { 
      name: "Sambrani Cup", 
      image: sambraniIcon,
      count: products.filter(p => p.category.toLowerCase().includes("sambrani")).length,
      // tagline: "SAMBARNI CUP"
    },
  ];

  return (
    <div className="home-container">
      <div className="main-container">
        {/* Hero Section with Carousel Background */}
        <div className="hero-section">
          {/* Carousel Background */}
          <div 
            className="carousel-container"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div 
                key={index} 
                className="banner-image"
                style={{ backgroundImage: `url(${banner})` }}
              />
            ))}
          </div>

          {/* Hero Content Overlay */}
          <div className="hero-content">
            <div className="hero-text-container">
              <h1 className="hero-title">A Blend Of Uniqueness</h1>
              <p className="hero-subtitle">Pure Prayers. Natural Essence...</p>
              <Link to="/category/incense-sticks" className="hero-button">Shop Now</Link>
            </div>
          </div>
        </div>
        
        {/* Top Categories Section - Updated to match Bestsellers style */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Top Categories</h2>
            <Link to="/categories" className="view-all">View All</Link>
          </div>
          
          <div className="products-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-image"
                  style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                />
                <h3 className="category-title">{category.name}</h3>
                <p className="category-count">{category.count} products</p>
                <p style={{ 
                  color: '#7A5E3A', 
                  fontSize: '14px', 
                  marginTop: '5px',
                  fontWeight: '500'
                }}>
                  {category.tagline}
                </p>
                <Link 
                  to={`/category/${category.name.toLowerCase().replace(' ', '-')}`} 
                  style={{
                    display: 'inline-block',
                    marginTop: '15px',
                    color: '#B53D1A',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>
        
        {/* Bestsellers Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Our Bestsellers</h2>
            <Link to="/category/bestsellers" className="view-all">View All</Link>
          </div>
          
          <div className="products-grid">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* New Arrivals Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/category/new-arrivals" className="view-all">View All</Link>
          </div>
          
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* Immunity Banner Section */}
        <div className="full-width-solution">
          <div className="solution-content">
            <h2 className="solution-title">Build Your Immunity with Ayurveda's Top Picks</h2>
            <h3 className="solution-subtitle">Stronger Immunity, Tested by Ayurveda Experts</h3>
            <p className="solution-text">Trusted by 2M+ customers worldwide</p>
            <Link to="/category/health-wellness" className="solution-button">Explore Products</Link>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Customer Reviews</h2>
          </div>
          <Testimonial />
        </section>
      </div>
    </div>
  );
};

export default Home;