var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();
//查詢狗狗資料
router.get("/", function (req, res) {
  const sql = "SELECT * FROM dog";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
//查詢狗狗主人
router.get("/:mId?", function (req, res) {
  const sql = "SELECT * FROM dog WHERE mId = ?";
  db.queryAsync(sql, [req.params.mId]).then(result => {
    return res.json(result);
  });
});
//新增狗狗資料
router.post("/insert", function (req, res) {
  const sql = `INSERT INTO \`dog\`(\`dName\`,\`mId\`,\`dImg\`,\`dGender\`,\`dYear\`,\`dMonth\`,\`dWeight\`,\`dInfo\`, \`created_at\`, \`updated_at\`)VALUES(?,?,?,?,?,?,?,?,NOW(),NOW())`
  db.queryAsync(sql,[
    req.body.dName,
    req.body.mId,
    req.body.dImg,
    req.body.dGender,
    req.body.dYear,
    req.body.dMonth,
    req.body.dWeight,
    req.body.dInfo,])
  .then(result => {
    return res.json(result);
  })
  .catch(err=>{
    console.log(err)
});
});
module.exports = router;