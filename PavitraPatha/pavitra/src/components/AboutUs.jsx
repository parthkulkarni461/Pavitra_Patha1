import React from 'react';
import '../components/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Pavitra Patha</h1>
        <p>Our journey in bringing authentic Ayurveda to your home</p>
      </div>

      <div className="about-us-content">
        <div className="about-us-section">
          <h2>Our Story</h2>
          <p>
            Pavitra Patha was founded with the mission of 'taking Ayurveda to every home'. 
            Our objective of making people happy and healthy through authentic Ayurvedic products 
            delivered at their doorstep is a direct response to the growing need for natural wellness solutions.
          </p>
          <p>
            Established in 2010, we have grown from a small Ayurvedic pharmacy to one of the most 
            trusted names in traditional Ayurvedic products.
          </p>
        </div>

        <div className="about-us-section">
          <h2>Our Mission</h2>
          <p>
            To provide high-quality, authentic Ayurvedic products that are carefully crafted using 
            traditional methods and formulations passed down through generations.
          </p>
        </div>

        <div className="about-us-section">
          <h2>Our Products</h2>
          <p>
            All our products are manufactured at our ISO-certified facility in Maharashtra, India. 
            We use only the finest natural ingredients sourced from trusted suppliers who share 
            our commitment to quality and sustainability.
          </p>
          <ul className="product-features">
            <li>100% Natural Ingredients</li>
            <li>Traditional Ayurvedic Formulations</li>
            <li>No Artificial Preservatives</li>
            <li>Environmentally Friendly Packaging</li>
          </ul>
        </div>

        <div className="about-us-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of experienced Ayurvedic practitioners, researchers, and wellness experts 
            who are passionate about sharing the benefits of Ayurveda. We have provided authentic 
            Ayurvedic solutions to thousands of customers across India.
          </p>
        </div>
      </div>

      <div className="disclaimer-section">
        <p>
          NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY SEEKING MEDICAL TREATMENT 
          BECAUSE OF SOMETHING YOU HAVE READ ON OR ACCESSED THROUGH THIS WEB SITE.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;