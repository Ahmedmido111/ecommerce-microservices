const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cart.db', (err) => {
    if (err) console.error('Failed to connect to database:', err.message);
    else console.log('Connected to Cart database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    productId INTEGER,
    quantity INTEGER
  )`);
});

module.exports = db;
