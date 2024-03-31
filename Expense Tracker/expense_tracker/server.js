const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Create and connect to the database
const db = new sqlite3.Database('./expenses.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,
  amount REAL
)`);

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to get all expenses
app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses', (err, rows) => {
    if (err) {
      console.error('Error getting expenses:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Route to add new expense
app.post('/expenses', (req, res) => {
  const { text, amount } = req.body;
  if (!text || !amount) {
    return res.status(400).json({ error: 'Please provide both description and amount' });
  }

  db.run('INSERT INTO expenses (text, amount) VALUES (?, ?)', [text, amount], function(err) {
    if (err) {
      console.error('Error adding expense:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
