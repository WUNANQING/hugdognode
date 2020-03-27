var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

//收藏
router.get("/", function(req, res) {
  const sql = "SELECT * FROM activity_collection";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
//收藏mId
router.get("/:mId?", function(req, res) {
  const sql = "SELECT * FROM activity_collection WHERE mId = ?";
  console.log(req.params.mId)
  db.queryAsync(sql, [req.params.mId]).then(result=>{return res.json(result)})
})
//收藏課程
router.post("/insertCollect", function(req, res) {
  const sql = `INSERT INTO \`activity_collection\`(\`mId\`,\`oId\`,\`oName\`,\`oDate\`)VALUES(?,?,?,?)`;
  db.queryAsync(sql, [
    req.body.mId,
    req.body.oId,
    req.body.oName,
    req.body.oDate
  ])
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//收藏講座
router.post("/insertLecture", function(req, res) {
  const sql = `INSERT INTO \`activity_collection\`(\`mId\`,\`oId\`,\`oName\`,\`oDate\`)VALUES(?,?,?,?)`;
  db.queryAsync(sql, [
    req.body.mId,
    req.body.oId,
    req.body.oName,
    req.body.oDate
  ])
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
