const { Pool } = require('pg');

const pool = new Pool({
    user: 'do not know yet',
    host: 'do not know yet',
    database: 'do not know yet',
    password: 'do not know yet',
    port: 5432,
});

pool.query('SELECT NOW()', (error, result) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Database connection successful:', result.rows[0].now);
    }
    pool.end();
});