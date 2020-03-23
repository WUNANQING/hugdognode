var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();
//查詢訂單資料
router.get("/", function (req, res) {
    const sql = "SELECT * FROM orders";
    db.queryAsync(sql).then(result => {
      return res.json(result);
    });
  });
  //訂單細節資料
  router.get("/:mId?", function(req, res) {
    const sql = `SELECT * FROM orders WHERE mId = ?`;
    console.log(req.params.mId);
    db.queryAsync(sql, [req.params.mId]).then(result => {
      return res.json(result);
    });
  });
module.exports = router;