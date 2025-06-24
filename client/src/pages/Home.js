import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#about') {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="home">
      {/* ------------ Hero Section ------------ */}
      <div className="hero">
  <div className="hero-text">
    <h1>
      <span className="highlight">Enjoy Your  Healthy</span><br />
      <span className="highlight">Delicious Food</span>
    </h1>
    <p>
      We serve tasty, hygienic homemade meals<br />
      across Warangal and Hanamkonda
    </p>

    <div className="hero-buttons">
      <a href="/menu" className="btn">🍽️ View Menu</a>
      <a href="tel:+919392727179" className="btn secondary">📞 Call to Order</a>
    </div>
  </div>

  <div className="hero-image">
    <img src="/assets/delicious food.png" alt="Delicious Homemade Food" />
  </div>
</div>

      {/* ------------ Popular Dishes Section ------------ */}
      <div className="popular">
        <h2>Popular Dishes</h2>

        <div className="popular-dishes">
          <div className="recipe-card">
            <img src="/assets/dosa.jpg" alt="Tasty Dosa" />
            <div className="recipe-title">Tasty Dosa</div>
            <div className="recipe-sub">Crispy millet dosa with chutney</div>
          </div>

          <div className="recipe-card">
            <img src="/assets/salad.jpg" alt="Fresh Salad" />
            <div className="recipe-title">Fresh Salad</div>
            <div className="recipe-sub">Colorful veggies with home-style dressing</div>
          </div>

          <div className="recipe-card">
            <img src="/assets/rice.jpg" alt="Homemade Rice" />
            <div className="recipe-title">Homemade Rice</div>
            <div className="recipe-sub">Steamed rice served with love & ghee</div>
          </div>
        </div>
      </div>

      {/* ------------ About Us Section ------------ */}
      <div id="about" className="about">
        <h2>About Us</h2>
        <p>
          RuchuluByAmma brings you healthy, home-cooked food made with love by moms in Warangal & Hanamkonda.
          We focus on fresh ingredients, traditional recipes, and hygienic preparation to give you a taste of home every day.
        </p>
      </div>
    </div>
  );
}

export default Home;
