const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const DB_CONFIG = {
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'root',
};

async function initPostgreSQL() {
  console.log('Connecting to master postgres server...');
  const rootClient = new Client({ ...DB_CONFIG, database: 'postgres' });
  await rootClient.connect();

  const checkDb = await rootClient.query(
    "SELECT 1 FROM pg_database WHERE datname = 'swayamurja_db'"
  );
  if (checkDb.rows.length === 0) {
    console.log("Database 'swayamurja_db' does not exist. Creating now...");
    await rootClient.query('CREATE DATABASE swayamurja_db;');
    console.log("Database 'swayamurja_db' created successfully!");
  } else {
    console.log("Database 'swayamurja_db' already exists.");
  }
  await rootClient.end();

  console.log("Connecting to 'swayamurja_db' to apply schema and seed data...");
  const appClient = new Client({ ...DB_CONFIG, database: 'swayamurja_db' });
  await appClient.connect();

  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  console.log('Executing schema.sql...');
  await appClient.query(schemaSql);
  console.log('Schema applied successfully!');

  const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
  console.log('Executing seed.sql...');
  await appClient.query(seedSql);
  console.log('Seed data inserted successfully!');

  // Verify tables
  const tables = await appClient.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);

  console.log('\n--- VERIFIED POSTGRESQL TABLES IN swayamurja_db ---');
  for (const row of tables.rows) {
    const countRes = await appClient.query(`SELECT COUNT(*) FROM "${row.table_name}";`);
    console.log(`Table: ${row.table_name.padEnd(22)} | Rows: ${countRes.rows[0].count}`);
  }

  await appClient.end();
  console.log('\nPostgreSQL initialization 100% COMPLETE!');
}

initPostgreSQL().catch(err => {
  console.error('Initialization error:', err);
  process.exit(1);
});
