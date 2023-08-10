const mysql = require("mysql2/promise");

const dbQuery = async (query) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
  const queryResult = await connection.query(query) 
  return queryResult[0]
};

module.exports = { dbQuery };
