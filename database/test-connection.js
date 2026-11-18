// Quick PostgreSQL connection test script
const { Client } = require('pg');

const PASSWORDS = ['postgres', 'admin', 'root', '123456', 'password', 'swayamurja'];
const PORTS = [5432, 5433];

async function tryConnect(port, password) {
  const client = new Client({
    host: '127.0.0.1',
    port: port,
    user: 'postgres',
    password: password,
    database: 'postgres',
    connectionTimeoutMillis: 2000,
  });

  try {
    await client.connect();
    console.log(`>>> SUCCESS! Connected to PostgreSQL on Port ${port} with password: "${password}"`);
    const res = await client.query('SELECT version();');
    console.log('PostgreSQL Version:', res.rows[0].version);
    await client.end();
    return { port, password, success: true };
  } catch (err) {
    // console.log(`Port ${port} with "${password}" failed:`, err.message);
    try { await client.end(); } catch(_) {}
    return { port, password, success: false, error: err.message };
  }
}

async function findCredentials() {
  console.log('Testing PostgreSQL credentials on localhost:5432 and 5433...');
  for (const port of PORTS) {
    for (const pwd of PASSWORDS) {
      const res = await tryConnect(port, pwd);
      if (res.success) {
        return;
      }
    }
  }
  console.log('None of the default passwords matched. Waiting for user password input.');
}

findCredentials();
