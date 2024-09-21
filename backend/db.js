const mysql = require('mysql2');

// create the MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'merchandise_db'
});


// check connection to MySQL
db.connect((err) => {
    if(err) throw err;
    console.log("SUCCESSFULLY Connected Merchandise Database");
});

module.exports = db
