const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'sakshya_forensics.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('[DB Error]', err.message);
  else console.log('[DB Engine Connected] sakshya_forensics.db');
});

db.serialize(() => {
  // Users & Roles Table with Multi-Role Constraints
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      badge_id TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT CHECK(role IN ('SYSTEM_ADMIN', 'LEAD_INVESTIGATOR', 'JUDGE', 'FORENSIC_ANALYST')) NOT NULL,
      clearance_level INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Evidence Registry (SHA-256 Forensic Vault)
  db.run(`
    CREATE TABLE IF NOT EXISTS evidence_registry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evidence_id TEXT UNIQUE NOT NULL,
      case_number TEXT NOT NULL,
      title TEXT NOT NULL,
      sha256_hash TEXT NOT NULL,
      file_size_bytes INTEGER NOT NULL,
      custodian_badge TEXT NOT NULL,
      status TEXT DEFAULT 'SEALED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;