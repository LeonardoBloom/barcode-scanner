const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'merchandise_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log("SUCCESSFULLY Connected Merchandise Database from Database")
})

module.exports = db