const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// POST payment (fake)
app.post('/pay', (req, res) => {
  const { orderId, amount, status } = req.body;
  db.run("INSERT INTO payments (orderId, amount, status) VALUES (?, ?, ?)",
         [orderId, amount, status], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ paymentId: this.lastID });
  });
});

// GET payment status
app.get('/payment/:paymentId', (req, res) => {
  db.get("SELECT * FROM payments WHERE paymentId=?", [req.params.paymentId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

app.listen(3004, () => console.log('Payment Service running on port 3004'));
