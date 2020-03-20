const mysql = require("mysql");
const bluebird = require("bluebird");
const db = mysql.createConnection({
  host: "localhost",
  // user: "root",
  // password: "root",
  user: 'qazqaz',
  password: 'qazqaz',
  database: "pet_db",
  dateStrings: true,
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected");
});

bluebird.promisifyAll(db);
module.exports = db;
