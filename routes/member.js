var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.get("/", function (req, res) {
  const sql = "SELECT * FROM member";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});

module.exports = router;