const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ndh3427318@",
  database: "campus_market"
});

module.exports = pool;
