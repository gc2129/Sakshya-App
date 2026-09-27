const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ONLINE', engine: 'Sakshya Core Forensic Vault v1.0', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[SAKSHYA BACKEND] Active on http://localhost:${PORT}`);
});