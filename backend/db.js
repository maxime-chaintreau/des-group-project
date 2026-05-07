const pgp = require("pg-promise")();

const db = process.env.DATABASE_URL
  ? pgp({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : pgp({
      host: "127.0.0.1",
      port: 5432,
      database: "indead",
      user: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD,
    });

module.exports = db;