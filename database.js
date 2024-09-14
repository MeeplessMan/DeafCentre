const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'MeepPipe211004',
    database: 'deafcentre'
});


console.log(result);
console.log(result[0]);