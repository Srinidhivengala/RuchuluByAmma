import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import YourOrders from './pages/YourOrders';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';

import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [menuItems, setMenuItems] = useState({});
  const [user, setUser] = useState(null); // 👤 user state

  // Fetch menu on load
  useEffect(() => {
    fetch('http://localhost:5000/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Menu fetch error:', err));
  }, []);

  return (
    <CartProvider>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu menuItems={menuItems} />} />
            <Route path="/order" element={<Order menuItems={menuItems} />} />
            <Route path="/orders" element={<YourOrders />} />

            {/* Auth */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin route - only if user is admin */}
            <Route
              path="/admin"
              element={
                user && user.role === 'admin' ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
