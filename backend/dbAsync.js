const mysql = require('mysql2/promise');

// create the MySQL connection
const dbAsync = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'merchandise_db'
});


// check connection to MySQL
dbAsync.getConnection()
    .then(connection => {
        console.log("SUCCESSFULLY Connected to Merchandise Database(Promise)");
        connection.release();
    })
    .catch(err => {
        console.log("Error connecting to the database: ", err);
    });

module.exports = dbAsync
