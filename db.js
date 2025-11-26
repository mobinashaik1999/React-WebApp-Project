const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Innu@2025',   // replace with your root password
  database: 'react_app_db',
  port: 3306
});

module.exports = pool;
