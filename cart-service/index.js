const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// GET cart by user
app.get('/cart/:userId', (req, res) => {
    db.all("SELECT * FROM carts WHERE userId=?", [req.params.userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST add item to cart
app.post('/cart/:userId', (req, res) => {
    const { productId, quantity } = req.body;
    db.run(`INSERT INTO carts (userId, productId, quantity) VALUES (?, ?, ?)`,
        [req.params.userId, productId, quantity], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        });
});

// PUT update quantity
app.put('/cart/:userId/:productId', (req, res) => {
    const { quantity } = req.body;
    db.run("UPDATE carts SET quantity=? WHERE userId=? AND productId=?",
        [quantity, req.params.userId, req.params.productId], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: true });
        });
});

// DELETE item from cart
app.delete('/cart/:userId/:productId', (req, res) => {
    db.run("DELETE FROM carts WHERE userId=? AND productId=?",
        [req.params.userId, req.params.productId], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ deleted: true });
        });
});

app.listen(3002, () => console.log('Cart Service running on port 3002'));
