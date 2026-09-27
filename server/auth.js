const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'sakshya_gov_forensic_secure_key_2026';

// Seed All Required System Roles
const seedAccounts = [
  { badge_id: 'GOV-ADMIN-01', name: 'Director General (System Admin)', email: 'admin@sakshya.gov.in', role: 'SYSTEM_ADMIN', clearance: 5 },
  { badge_id: 'GOV-INV-01', name: 'Senior Inspector (Investigating Officer)', email: 'investigator@sakshya.gov.in', role: 'LEAD_INVESTIGATOR', clearance: 4 },
  { badge_id: 'GOV-JUDGE-01', name: 'Honorable Magistrate (Judicial Bench)', email: 'judge@sakshya.gov.in', role: 'JUDGE', clearance: 5 },
  { badge_id: 'GOV-ANALYST-01', name: 'Lead Forensic Examiner', email: 'analyst@sakshya.gov.in', role: 'FORENSIC_ANALYST', clearance: 3 }
];

db.serialize(async () => {
  const hash = await bcrypt.hash('Sakshya@2026', 10);
  seedAccounts.forEach(acc => {
    db.run(
      `INSERT OR IGNORE INTO users (badge_id, full_name, email, password_hash, role, clearance_level)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [acc.badge_id, acc.name, acc.email, hash, acc.role, acc.clearance]
    );
  });
  console.log('[DB SEED Complete] Credentials: Badge IDs (GOV-ADMIN-01, GOV-INV-01, GOV-JUDGE-01, GOV-ANALYST-01) | Pass: Sakshya@2026');
});

// Auth Login API Endpoint
router.post('/login', (req, res) => {
  const { badge_id, password, role } = req.body;

  if (!badge_id || !password || !role) {
    return res.status(400).json({ success: false, message: 'Badge ID, Password and Role Selection are required.' });
  }

  db.get("SELECT * FROM users WHERE badge_id = ?", [badge_id], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ success: false, message: 'Invalid Badge ID or Security Passphrase.' });
    }

    if (user.role !== role) {
      return res.status(403).json({ success: false, message: `Access Denied: Badge ID is not registered under ${role.replace('_', ' ')} role.` });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid Badge ID or Security Passphrase.' });
    }

    const token = jwt.sign(
      { id: user.id, badge_id: user.badge_id, role: user.role, clearance: user.clearance_level },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      user: {
        badge_id: user.badge_id,
        full_name: user.full_name,
        role: user.role,
        clearance_level: user.clearance_level
      }
    });
  });
});

module.exports = router;