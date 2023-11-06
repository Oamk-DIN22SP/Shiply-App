require('dotenv').config();
export default {
  HOST: process.env.HOST,
  USER:process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  connectTimeout: process.env.connectTimeout

};

