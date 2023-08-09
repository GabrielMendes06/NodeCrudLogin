const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((error) => {
    if(error) throw error;
    console.log(`Conetado ao banco de dados: ${process.env.PORT}`)
});

module.exports = connection