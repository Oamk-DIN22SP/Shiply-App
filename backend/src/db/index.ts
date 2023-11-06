import dbConfig from "../config/db.config";

const mysql = require('mysql2/promise');
const configDB = require('../config/db.config');

export default mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
