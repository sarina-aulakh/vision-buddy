// PERSON C OWNS THIS FILE
// Express proxy for Snowflake — keeps DB credentials off the browser
// Snowflake credentials: root .env → SNOWFLAKE_* vars
// Run: node server/index.js

require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const snowflake = require('snowflake-sdk');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const connection = snowflake.createConnection({
  account:   process.env.SNOWFLAKE_ACCOUNT,
  username:  process.env.SNOWFLAKE_USER,
  password:  process.env.SNOWFLAKE_PASSWORD,
  database:  process.env.SNOWFLAKE_DATABASE,
  schema:    process.env.SNOWFLAKE_SCHEMA,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
});

connection.connect((err) => {
  if (err) console.error('❌ Snowflake error:', err.message);
  else console.log('✅ Snowflake connected');
});

function query(sql, binds = []) {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText: sql, binds,
      complete: (err, _s, rows) => err ? reject(err) : resolve(rows)
    });
  });
}

app.get('/api/buildings', async (req, res) => {
  try {
    const rows = await query('SELECT DISTINCT building_name FROM room_paths ORDER BY building_name');
    res.json(rows.map(r => r.BUILDING_NAME));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/paths/:buildingName', async (req, res) => {
  try {
    const rows = await query(
      'SELECT id, building_name, gemini_summary, created_at FROM room_paths WHERE building_name = ? ORDER BY created_at DESC LIMIT 20',
      [req.params.buildingName]
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/paths', async (req, res) => {
  const { buildingName, geminiSummary, pathData } = req.body;
  try {
    await query(
      "INSERT INTO room_paths (building_name, gemini_summary, path_data) VALUES (?, ?, PARSE_JSON(?))",
      [buildingName, geminiSummary, JSON.stringify(pathData)]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(3001, () => console.log('🚀 Server on http://localhost:3001'));
