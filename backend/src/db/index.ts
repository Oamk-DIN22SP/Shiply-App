require('dotenv').config();

const mysql = require('mysql2/promise');
const configDB = require('../config/db.config');

export default mysql.createConnection({
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  connectTimeout: process.env.connectTimeout
});
