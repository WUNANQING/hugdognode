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

//收藏課程
router.post("/insertClass", function(req, res) {
  const sql = `INSERT INTO \`activity_collection\`(\`mId\`,\`cId\`)VALUES(?,?)`;
  db.queryAsync(sql, [req.body.mId, req.body.cId])
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//收藏講座
router.post("/insertLecture", function(req, res) {
  const sql = `INSERT INTO \`activity_collection\`(\`mId\`,\`LId\`)VALUES(?,?)`;
  db.queryAsync(sql, [req.body.mId, req.body.LId])
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
