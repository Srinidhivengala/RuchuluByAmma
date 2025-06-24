import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchMenu();
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:5000/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  const fetchMenu = () => {
    fetch('http://localhost:5000/menu')
      .then(res => res.json())
      .then(data => setMenu(data));
  };

  const updateStatus = (orderId, status) => {
    fetch(`http://localhost:5000/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(() => fetchOrders());
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <section>
        <h2>🧾 Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="admin-order">
              <h3>Order #{order.id}</h3>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Status:</strong> {order.status || 'Pending'}</p>
              <button onClick={() => updateStatus(order.id, 'Accepted')}>Accept</button>
              <button onClick={() => updateStatus(order.id, 'Delivered')}>Mark as Delivered</button>
            </div>
          ))
        )}
      </section>

      <section>
        <h2>📋 Menu (Read-Only for Now)</h2>
        {Object.entries(menu).map(([category, items]) => (
          <div key={category}>
            <h3>{category.toUpperCase()}</h3>
            {items.map(item => (
              <div key={item.id} className="menu-item">
                <span>{item.name} - {item.price}</span>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminPanel;
