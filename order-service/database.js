const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./orders.db', (err) => {
  if (err) console.error('Failed to connect to database:', err.message)
  else console.log('Connected to Orders database.')
})

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    orderId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    items TEXT,  -- items stored as JSON string
    status TEXT
  )`)
})

module.exports = db
