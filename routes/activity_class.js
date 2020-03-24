var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.get("/", function(req, res) {
  const sql = "SELECT * FROM activity_class";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});

router.get("/:cId?", function(req, res) {
  const sql = "SELECT * FROM activity_class WHERE cId = ?";
  db.queryAsync(sql, [req.params.cId]).then(result => {
    return res.json(result);
  });
});
module.exports = router;
