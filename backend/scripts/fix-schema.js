const pool = require('../config/db');

async function fixSchema() {
  console.log('Fixing schema & ensuring columns exist...');
  const conn = await pool.getConnection();

  try {
    // Drop existing tables and recreate cleanly
    await conn.query('DROP TABLE IF EXISTS messages');
    await conn.query('DROP TABLE IF EXISTS site_settings');
    await conn.query('DROP TABLE IF EXISTS education');
    await conn.query('DROP TABLE IF EXISTS experience');
    await conn.query('DROP TABLE IF EXISTS projects');
    await conn.query('DROP TABLE IF EXISTS skills');
    await conn.query('DROP TABLE IF EXISTS hero_settings');
    await conn.query('DROP TABLE IF EXISTS profile');
    await conn.query('DROP TABLE IF EXISTS admins');

    console.log('Old tables dropped.');
  } catch (err) {
    console.error('Error dropping:', err);
  } finally {
    conn.release();
  }

  // Now re-run initDB
  const initDB = require('./init-db');
  await initDB();
}

fixSchema()
  .then(() => {
    console.log('Schema fixed and initialized!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed fixing schema:', err);
    process.exit(1);
  });
