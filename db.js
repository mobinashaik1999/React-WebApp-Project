const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
   ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
