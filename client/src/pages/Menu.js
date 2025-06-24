import React, { useEffect, useState } from 'react';
import './Menu.css';
import { useCart } from '../context/CartContext'; // ✅ Correct import

const Menu = () => {
  const [activeTab, setActiveTab] = useState('tiffins');
  const [menuItems, setMenuItems] = useState({});

  const { cartItems, setCartItems } = useCart(); // ✅ Using useCart()

  useEffect(() => {
    fetch('http://localhost:5000/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Error fetching menu:', err));
  }, []);

  const tabs = [
    { key: 'tiffins', label: 'Tiffins' },
    { key: 'snacks', label: 'Snacks' },
    { key: 'salads', label: 'Salads' },
    { key: 'rice', label: 'Rice Varieties' }
  ];

  const increaseItem = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const decreaseItem = (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[itemId]) {
        updated[itemId]--;
        if (updated[itemId] <= 0) delete updated[itemId];
      }
      return updated;
    });
  };

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>

      <div className="menu-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="menu-items">
        {menuItems[activeTab]?.map(item => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />

            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <span className="price">{item.price}</span>
            </div>

            <div className="qty-controls">
              <button onClick={() => decreaseItem(item.id)}>-</button>
              <span>{cartItems[item.id] || 0}</span>
              <button onClick={() => increaseItem(item.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>🛒 Total Items: {Object.values(cartItems).reduce((a, b) => a + b, 0)}</h3>
      </div>
    </div>
  );
};

export default Menu;
