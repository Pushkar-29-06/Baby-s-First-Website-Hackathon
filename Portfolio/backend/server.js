const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'database.json');

function readDB() {
  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { odometer: 0, overdrive_triggers: 0, guestbook: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// Odometer endpoints
app.get('/api/odometer', (req, res) => {
  const db = readDB();
  res.json({ count: db.odometer });
});

app.post('/api/odometer/tick', (req, res) => {
  const db = readDB();
  db.odometer = (db.odometer || 0) + 1;
  writeDB(db);
  res.json({ count: db.odometer });
});

// Easter Egg trigger
app.post('/api/easter-egg/trigger', (req, res) => {
  const db = readDB();
  db.overdrive_triggers = (db.overdrive_triggers || 0) + 1;
  writeDB(db);
  res.json({ overdrive_triggers: db.overdrive_triggers });
});

// Guestbook endpoints
app.get('/api/guestbook', (req, res) => {
  const db = readDB();
  res.json(db.guestbook || []);
});

app.post('/api/guestbook', (req, res) => {
  const entry = req.body; // expect { name, message, ... }
  const db = readDB();
  db.guestbook = db.guestbook || [];
  db.guestbook.push({ ...entry, timestamp: new Date().toISOString() });
  writeDB(db);
  res.json({ success: true, entry: entry });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('✨ AIML Local Node Backend running on port', PORT + '...');
});
