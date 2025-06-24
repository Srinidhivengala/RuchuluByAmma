import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, menuItems }) => {
  const allItems = Object.values(menuItems).flat();
  const cartList = allItems.filter(item => cartItems[item.id]);

  const getTotal = () => {
    return cartList.reduce((total, item) => {
      const qty = cartItems[item.id];
      const price = parseInt(item.price.replace('₹', '')) || 0;
      return total + price * qty;
    }, 0);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartList.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartList.map(item => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                  <p>Qty: {cartItems[item.id]}</p>
                  <p>Price: ₹{parseInt(item.price.replace('₹', '')) * cartItems[item.id]}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total Price: ₹{getTotal()}</h3>
          <button
            className="order-btn"
            onClick={() => {
              fetch('http://localhost:5000/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart: cartItems })
              })
                .then(res => res.json())
                .then(data => alert(data.message || 'Order placed successfully!'))
                .catch(err => console.error('Order error:', err));
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
