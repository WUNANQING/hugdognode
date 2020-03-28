const mysql = require("mysql");
const bluebird = require("bluebird");
const db = mysql.createConnection({
  // host: "192.168.23.45",
  host: "localhost",
  user: "root",
  password: "",
  // user: "root",
  // password: "",
  // user: 'qweqwe',
  // password: 'qweqwe',
  // user: 'test',
  // password: '284t;61l vul3t;6',
  database: "pet_db",
  dateStrings: true
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected");
});

bluebird.promisifyAll(db);
module.exports = db;
