var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.get("/", function(req, res) {
  const sql = "SELECT * FROM activity_lecture ORDER BY LId DESC LIMIT 6";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
router.get("/:LId?", function(req, res) {
  const sql = "SELECT * FROM activity_lecture WHERE LId = ?";
  db.queryAsync(sql, [req.params.LId]).then(result => {
    return res.json(result);
  });
});
module.exports = router;
