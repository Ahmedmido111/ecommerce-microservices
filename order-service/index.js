const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// GET all orders
app.get('/orders', (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET order by ID
app.get('/orders/:orderId', (req, res) => {
    db.get("SELECT * FROM orders WHERE orderId=?", [req.params.orderId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// POST create new order
app.post('/orders', (req, res) => {
    const { userId, items, status } = req.body;
    db.run("INSERT INTO orders (userId, items, status) VALUES (?, ?, ?)",
        [userId, JSON.stringify(items), status], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ orderId: this.lastID });
        });
});

// PUT update order status
app.put('/orders/:orderId', (req, res) => {
    const { status } = req.body;
    db.run("UPDATE orders SET status=? WHERE orderId=?",
        [status, req.params.orderId], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: true });
        });
});

app.listen(3003, () => console.log('Order Service running on port 3003'));
