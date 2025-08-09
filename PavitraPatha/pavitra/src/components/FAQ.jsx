import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../components/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, net banking, UPI payments, and cash on delivery (COD) for eligible orders."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within India. Express shipping options are available at checkout for faster delivery."
    },
    {
      question: "Are your products authentic Ayurvedic formulations?",
      answer: "Yes, all our products are prepared following traditional Ayurvedic formulations with 100% natural ingredients."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We're working on expanding our international shipping options."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 15-day return policy for unopened products. Please contact our customer support for return requests."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via SMS and email that you can use to track your package."
    },
    {
      question: "Are your products tested on animals?",
      answer: "No, all our products are cruelty-free and never tested on animals."
    },
    {
      question: "Do you offer wholesale or bulk orders?",
      answer: "Yes, we offer special pricing for bulk orders. Please contact our sales team at wholesale@pavitrapatha.com for inquiries."
    }
  ];

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products and services</p>
      </div>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="faq-support">
        <h2>Still have questions?</h2>
        <p>Contact our customer support team for further assistance</p>
        <a href="/contact" className="support-button">Contact Us</a>
      </div>
    </div>
  );
};

export default FAQ;