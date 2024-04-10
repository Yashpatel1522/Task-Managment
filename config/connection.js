const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.connect(function (error) {
  try {
    if (error) console.log(error);
    else console.log("Database Connected!");
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = connection;