require('dotenv').config();

let PORT = process.env.PORT;

let DB_URI = process.env.NODE_ENV === 'test'
  ? process.env.DB_TEST_CONNECTION_STRING
  : process.env.DB_CONNECTION_STRING;

module.exports = {
  DB_URI,
  PORT
};