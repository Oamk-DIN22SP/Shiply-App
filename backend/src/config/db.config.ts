require('dotenv').config();
const mysql = require('mysql');

const createDbConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: 'admin',
    password: process.env.PASSWORD,
    database: process.env.DB,
    connectTimeout: process.env.connectTimeout
  });

  try {
    await connection.connect();
    console.log('Connected to MySQL database!');
  } catch (error) {
    console.log('-----------------------------------');
    console.error('Error connecting to MySQL database:', error);
    console.log('-----------------------------------');
  }

  return connection;
};

export default createDbConnection;
