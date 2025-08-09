import React from 'react';
import '../components/ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-us-header">
        <h1>Contact Pavitra Patha</h1>
        <p>We'd love to hear from you! Get in touch with our team</p>
      </div>

      <div className="contact-us-content">
        <div className="contact-info-section">
          <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our Location</h2>
          
          <div className="office-info">
            <h3>Address</h3>
            <p>Pavitra Patha Ayurvedic Center</p>
            <p>Near Siddheshwar Temple Road</p>
            <p>Sangli, Maharashtra 416416</p>
            <p>Tel: +91 0000000000</p>
            <p>Email: info@pavitrapatha.com</p>

            <br></br>
            <br></br>
          <div className="office-infp">
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
            
            <div className="map-container">
              {/* Simple embed URL format that always works */}
              <iframe
                title="Pavitra Patha Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.028147734571!2d74.6034779!3d16.8387169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1118a9c5a8231%3A0x3f5b9328f13a7b8d!2sSiddheshwar%20Temple%20Rd%2C%20Sangli%2C%20Maharashtra%20416416!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+91 " 
                pattern="[+]{1}[0-9]{2}[0-9]{10}"
                title="Format: +91 followed by 10 digits"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Enter subject" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Type your message here..." 
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;