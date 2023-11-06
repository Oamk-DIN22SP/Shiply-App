require('dotenv').config();
const mysql = require('mysql2');

const db  = mysql.createConnection ({
  host: process.env.HOST,
  user: 'admin',
  password: process.env.PASSWORD,
  database: process.env.DB,
  connectTimeout: process.env.connectTimeout
});
// connect to the MySQL database
db.connect((error: Error) => {
  if (error) {
    console.log('-----------------------------------');
    console.error('Error connecting to MySQL database:', error);
    console.log('-----------------------------------');
  } else {
    console.log('Connected to MySQL database!');
    console.log('-----------------------------------');
  }
});
export default db
