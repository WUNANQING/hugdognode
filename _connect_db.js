const mysql = require("mysql");
const bluebird = require("bluebird");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pet_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected");
});

bluebird.promisifyAll(db);
module.exports = db;
