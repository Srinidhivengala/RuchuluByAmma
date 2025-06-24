import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import SignUp from './SignUp';

const Navbar = () => {
  const location = useLocation();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#about';
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span className="ruchulu">Ruchulu</span><span className="byamma">ByAmma</span>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/order">Order</Link></li>
          <li><a href="/#about" onClick={handleAboutClick}>About Us</a></li>
          <li><button className="signup-btn" onClick={() => setShowSignUp(true)}>Sign Up</button></li>
        </ul>
      </nav>

      {/* Sign Up Modal */}
      <SignUp isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
    </>
  );
};

export default Navbar;
