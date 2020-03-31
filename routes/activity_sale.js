var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.get("/", function(req, res) {
  const sql = "SELECT * FROM activity_sale ORDER BY sId DESC LIMIT 6";
  // const sql = "SELECT * FROM activity_sale";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
router.get("/:sId?", function(req, res) {
  const sql = "SELECT * FROM activity_sale WHERE sId = ?";
  db.queryAsync(sql, [req.params.sId]).then(result => {
    return res.json(result);
  });
});
module.exports = router;
