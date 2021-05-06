const { Pool } = require("pg");

const pool = new Pool({
  //user: process.env.PGUSER,
  user: 'postgres',
  host: 'localhost',
  database: 'marktplatz',
  password: 'root123',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
