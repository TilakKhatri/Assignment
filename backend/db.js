const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appointment'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
})

module.exports = con;