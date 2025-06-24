import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-sections">
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📞 +91 9392727179</p>
            <p>📧 srinidhivengala28@gmail.com</p>
            <p>⌚ 7:00 AM - 9:00 PM</p>
          </div>

          <div className="footer-section">
            <h4>Visit Us</h4>
            <p>🏠 1-34/19,Hanamkonda</p>
            <p>📍 Warangal & Hanamkonda, Telangana</p>
          </div>
        </div>

        <p>© 2025 Ruchulu By Amma. All rights reserved.</p>

        <div className="social-links">
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-whatsapp"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
