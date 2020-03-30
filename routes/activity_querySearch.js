var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.get("/", async (req, res) => {
  let cond;
  let search = req.query.search;
  console.log("search");

  const t_sql = `SELECT * FROM activity_event WHERE eName Like "%${search}%" ORDER BY eId ASC`;

  const resData = await db.queryAsync(t_sql);
  console.log(resData);
  res.json({
    activity_event: resData
  });
});

module.exports = router;
