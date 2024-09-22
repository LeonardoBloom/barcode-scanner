const mysql = require('mysql2');

// create the MySQL connection
const db = mysql.createConnection({
    host: '192.168.17.103',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'merch_db'
});


// check connection to MySQL
db.connect((err) => {
    if(err) throw err;
    console.log("SUCCESSFULLY Connected Merchandise Database");
});

module.exports = db
