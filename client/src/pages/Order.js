import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';
import { useCart } from '../context/CartContext'; // ✅ updated

const Order = ({ menuItems }) => {
  const { cartItems, setCartItems } = useCart(); // ✅ updated
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const allItems = Object.values(menuItems).flat();
  const getItemById = (id) => allItems.find(item => item.id === parseInt(id));

  const total = Object.entries(cartItems).reduce((sum, [id, qty]) => {
    const item = getItemById(id);
    const price = item ? parseInt(item.price.replace(/[^\d]/g, '')) : 0;
    return sum + qty * price;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderItems = Object.entries(cartItems).map(([id, qty]) => {
      const item = getItemById(id);
      return {
        id: parseInt(id),
        name: item?.name || '',
        quantity: qty,
        price: item?.price || ''
      };
    });

    const orderData = {
      name,
      phone,
      address,
      items: orderItems,
      total
    };

    try {
      const res = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await res.json();
      console.log(result);

      alert('Order placed successfully!');
      setCartItems({});
      navigate('/orders');
    } catch (err) {
      console.error('Order error:', err);
      alert('Error placing order. Try again!');
    }
  };

  return (
    <div className="order-page">
      <h1>Place Your Order</h1>

      <div className="order-container">
        <div className="order-form">
          <h2>Order Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} type="text" required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" required />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
            <button type="submit" className="submit-btn">Place Order</button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Your Order</h2>
          <div className="summary-items">
            {Object.entries(cartItems).map(([id, qty]) => {
              const item = getItemById(id);
              const itemPrice = item ? parseInt(item.price.replace(/[^\d]/g, '')) : 0;
              return (
                <div key={id} className="summary-item">
                  <span>{qty} x {item?.name}</span>
                  <span>₹{itemPrice * qty}</span>
                </div>
              );
            })}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
