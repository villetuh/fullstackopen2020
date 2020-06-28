require('dotenv').config();

let DB_URI = process.env.DB_CONNECTION_STRING;
let PORT = process.env.PORT;

module.exports = {
  DB_URI,
  PORT
};