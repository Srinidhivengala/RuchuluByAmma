const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const menuData = {
  tiffins: [
    {
      id: 1,
      name: 'Ragi Dosa',
      price: '₹50',
      desc: 'Nutritious finger millet dosa',
      image: '/assets/ragi-dosa.jpg'
    },
    {
      id: 2,
      name: 'Millet Dosa',
      price: '₹50',
      desc: 'Healthy millet crepe',
      image: '/assets/millet-dosa.jpg'
    },
    {
      id: 3,
      name: 'Idly',
      price: '₹40',
      desc: 'Steamed rice cakes with chutney & sambar',
      image: '/assets/Idly.jpg'
    },
    {
      id: 4,
      name: 'Protein Dosa',
      price: '₹55',
      desc: 'High-protein dosa with lentil batter',
      image: '/assets/protien-dosa.jpg'
    },
    {
      id: 5,
      name: 'Pesarattu',
      price: '₹50',
      desc: 'Green gram dosa with ginger chutney',
      image: '/assets/pesarattu.jpg'
    }
  ],
  snacks: [
    {
      id: 6,
      name: 'Alu Bajji',
      price: '₹30',
      desc: 'Potato fritters in gram flour batter',
      image: '/assets/alu-bajji.jpg' // placeholder image
    },
    {
      id: 7,
      name: 'Mirchi Bajji',
      price: '₹35',
      desc: 'Spicy green chili fritters',
      image: '/assets/mirchi-bajji.jpg'
    },
    {
      id: 8,
      name: 'Beetroot Bajji',
      price: '₹30',
      desc: 'Crispy beetroot fritters',
      image: '/assets/beetroot-bajji.jpg' // placeholder image
    },
    {
      id: 9,
      name: 'Egg Bajji',
      price: '₹40',
      desc: 'Boiled egg fritters',
      image: '/assets/egg-bajji.jpg'
    }
  ],
  salads: [
    {
      id: 10,
      name: 'Oats Meal',
      price: '₹45',
      desc: 'Wholesome oats mixed with veggies',
      image: '/assets/oats-meal.jpg'
    },
    {
      id: 11,
      name: 'Fruit Salad',
      price: '₹40',
      desc: 'Mixed seasonal fruits with honey',
      image: '/assets/Fruit Salad.jpg'
    },
    {
      id: 12,
      name: 'Vegetables Salad',
      price: '₹35',
      desc: 'Raw veggies with lemon dressing',
      image: '/assets/Vegetables Salad.jpg'
    }
  ],
  rice: [
    {
      id: 13,
      name: 'Sambar Rice',
      price: '₹60',
      desc: 'Steamed rice mixed with sambar',
      image: '/assets/Sambar Rice.jpg'
    },
    {
      id: 14,
      name: 'Curd Rice',
      price: '₹50',
      desc: 'Curd mixed rice with seasoning',
      image: '/assets/rice.jpg' // placeholder image
    },
    {
      id: 15,
      name: 'Tomato Rice',
      price: '₹55',
      desc: 'Spicy tomato flavored rice',
      image: '/assets/Tomato Rice.jpg'
    },
    {
      id: 16,
      name: 'Kichidi',
      price: '₹60',
      desc: 'One-pot lentil rice with veggies',
      image: '/assets/Kichidi.jpg'
    },
    {
      id: 17,
      name: 'Vegetable Rice',
      price: '₹60',
      desc: 'Rice tossed with seasonal veggies',
      image: '/assets/Vegetable Rice.jpg'
    }
  ]
};
// ✅ POST /order – Save order with total
app.post('/order', (req, res) => {
  const { name, phone, address, items, total } = req.body;

  if (!name || !phone || !address || !items || total === undefined) {
    return res.status(400).json({ error: 'Missing order fields' });
  }

  const itemsJSON = JSON.stringify(items);

  const query = 'INSERT INTO orders (name, phone, address, items, total) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, phone, address, itemsJSON, total], (err, result) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error' });
    } else {
      return res.json({ message: 'Order placed successfully!' });
    }
  });
});

// ✅ GET /orders – Fetch all orders (with total)
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders ORDER BY id DESC', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching orders' });
    } else {
      return res.json(result);
    }
  });
});

// ---------------- AUTH ----------------

// Signup with role
app.post('/auth/signup', async (req, res) => {
  const { username, password, role = 'user' } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashed, role], (err, result) => {
    if (err) return res.status(500).json({ error: 'User exists or DB error' });
    res.json({ message: 'Signup successful' });
  });
});

// Login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Wrong password' });

    res.json({ message: 'Login successful', userId: user.id, role: user.role });
  });
});

// ✅ GET /menu – Return static menu
app.get('/menu', (req, res) => {
  res.json(menuData);
});

// ✅ Default test route
app.get('/', (req, res) => {
  res.send('Welcome to RuchuluByAmma Backend API');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
