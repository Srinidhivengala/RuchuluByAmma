import React, { useEffect, useState } from 'react';
import './YourOrders.css';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState({});

  useEffect(() => {
    // Fetch orders
    fetch('http://localhost:5000/orders')
      .then(res => res.json())
  .then(data => {
  const parsed = data.map(order => ({
    ...order,
    items: JSON.parse(order.items)
  }));
  console.log('Fetched Orders:', parsed); // 👈 add this
  setOrders(parsed);
});

    // Fetch menu data
    fetch('http://localhost:5000/menu')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  const getItemDetails = (id) => {
    const allItems = Object.values(menu).flat();
    return allItems.find(item => item.id === parseInt(id));
  };

  return (
    <div className="your-orders-page">
      <h1>📦 Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order #{order.id}</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>

            <div className="order-items">
              <strong>Items:</strong>
              {order.items.map((item, i) => {
                const details = getItemDetails(item.id);
                const name = details?.name || item.name || 'Unknown';
                const price = parseInt(details?.price?.replace(/[^\d]/g, '')) || 0;
                const itemTotal = item.quantity * price;

                return (
                  <div key={i} className="order-item">
                    <span>{item.quantity} x {name}</span>
                    <span>₹{itemTotal}</span>
                  </div>
                );
              })}
            </div>

            <div className="order-total">
              <strong>Total: ₹{order.total ?? 'N/A'}</strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YourOrders;
