const { Pool } = require("pg");

const pool = new Pool({
  //user: process.env.PGUSER,
<<<<<<< HEAD
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
=======
  user: 'postgres',
  host: 'localhost',
  database: 'marktplatz',
  password: 'root1234',
  port: 5433,
>>>>>>> 3a876961b7a24087e5d5225575fdb6f6c01d5b4d
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
