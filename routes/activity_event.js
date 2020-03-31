var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.get("/pageclass", function(req, res) {
  const sql = `SELECT * FROM activity_event WHERE eCate = '課程活動'`;
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
router.get("/pagelecture", function(req, res) {
  const sql = `SELECT * FROM activity_event WHERE eCate = '講座活動'`;
  console.log(sql);
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
router.get("/pagesale", function(req, res) {
  const sql = `SELECT * FROM activity_event WHERE eCate = '優惠活動'`;
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});

router.get("/:eId?", function(req, res) {
  const sql = "SELECT * FROM activity_event WHERE eId = ?";
  db.queryAsync(sql, [req.params.eId]).then(result => {
    return res.json(result);
  });
});

router.get("/", function(req, res) {
  const sql = "SELECT * FROM activity_event";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
module.exports = router;
