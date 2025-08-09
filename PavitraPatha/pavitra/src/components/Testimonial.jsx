import React, { useState, useEffect } from 'react';
import { FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../pages/Home.css';

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      text: "The herbal supplements have greatly improved my overall health. I highly recommend PavitraPatha!",
      author: "Rahul Sharma, Mumbai"
    },
    {
      id: 2,
      text: "Amazing quality of incense sticks. The fragrance lasts for hours and creates such a peaceful atmosphere.",
      author: "Priya Patel, Delhi"
    },
    {
      id: 3,
      text: "The Agnihotra kit has transformed my daily rituals. Authentic products and fast delivery.",
      author: "Arjun Singh, Bangalore"
    },
    {
      id: 4,
      text: "PavitraPatha's natural products have become an essential part of my wellness routine. Truly authentic!",
      author: "Meera Desai, Pune"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonial]);

  const nextTestimonial = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const prevTestimonial = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-carousel">
        <button 
          className="testimonial-nav-button prev" 
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
        >
          <FaChevronLeft />
        </button>
        
        <div className={`testimonial-slide ${isTransitioning ? 'fading' : ''}`}>
          <div className="testimonial-quote">“</div>
          <p className="testimonial-text">
            {testimonials[currentTestimonial].text}
          </p>
          <div className="testimonial-author">
            <FaHeart className="testimonial-heart" />
            <span>{testimonials[currentTestimonial].author}</span>
          </div>
        </div>
        
        <button 
          className="testimonial-nav-button next" 
          onClick={nextTestimonial}
          aria-label="Next testimonial"
        >
          <FaChevronRight />
        </button>
      </div>
      
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentTestimonial(index);
                setIsTransitioning(false);
              }, 300);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;