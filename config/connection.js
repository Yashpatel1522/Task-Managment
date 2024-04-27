const mysql = require("mysql");

const CONNECTION = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dateStrings: true,
});

const getConnection = async () => {
  return await new Promise((resolve, reject) => {
    try {
      CONNECTION.connect((error) => {
        if (error) {
          reject(error.sqlMessage);
        } else {
          resolve(CONNECTION);
        }
      });
    } catch (error) {
      throw error;
    }
  });
};

module.exports = getConnection;
