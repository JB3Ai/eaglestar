import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';

const app = express();
const port = 3001;

// Initialize database
const db = new Database('database.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(express.json());

// API Endpoints
app.post('/api/signup', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const stmt = db.prepare('INSERT INTO signups (name, email, phone) VALUES (?, ?, ?)');
    const info = stmt.run(name, email, phone);
    res.status(201).json({ id: info.lastInsertRowid, message: 'Signup successful' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/signups', (req, res) => {
  try {
    const signups = db.prepare('SELECT * FROM signups ORDER BY created_at DESC').all();
    res.json(signups);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
