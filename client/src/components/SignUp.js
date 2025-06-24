import React from 'react';
import './SignUp.css';

const SignUp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="modal-title">Sign Up</h2>

        <form className="signup-form">
          <input type="text" placeholder="Your name" required />
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="submit-btn">Create account</button>

          <div className="checkbox-wrap">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree">
              By continuing, I agree to the terms of use & privacy policy.
            </label>
          </div>

          <p className="login-link">
            Already have an account? <span onClick={onClose}>Login here</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
