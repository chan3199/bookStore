const mysql = require("mysql2/promise");

const createConn = async () => {
  return await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "Bookstore",
    dateStrings: true,
  });
};

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "Bookstore",
  dateStrings: true,
});

module.exports = { connection, createConn };
