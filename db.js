const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'drone_monitoring',
    password: 'Khalil@2025',
    port: 5432
});

module.exports = pool;
