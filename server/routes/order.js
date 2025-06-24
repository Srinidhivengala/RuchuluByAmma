// routes/order.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Save order to MySQL
router.post('/', (req, res) => {
  const cart = JSON.stringify(req.body.cart);

  const sql = 'INSERT INTO orders (items) VALUES (?)';
  db.query(sql, [cart], (err, result) => {
    if (err) {
      console.error('❌ Order insert failed:', err);
      return res.status(500).json({ error: 'Order not saved' });
    }

    res.json({ message: '✅ Order placed successfully!' });
  });
});

module.exports = router;
