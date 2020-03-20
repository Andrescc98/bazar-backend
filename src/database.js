const mysql = require("promise-mysql");
const { database } = require("./key");

const pool = mysql.createPool(database);

pool
  .getConnection()
  .then(connection => {
    pool.releaseConnection(connection);
    console.log("DATABASE IS CONNECT");
  })
  .catch(err => {
    console.log("ERROR ", err.errno, " - ", err.sqlMessage);
  });

module.exports = pool;
