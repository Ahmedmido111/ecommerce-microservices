const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./payments.db', (err) => {
  if (err) console.error('Failed to connect to database:', err.message);
  else console.log('Connected to Payments database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS payments (
    paymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER,
    amount REAL,
    status TEXT
  )`);
});

module.exports = db;
