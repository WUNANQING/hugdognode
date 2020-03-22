var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();
//查詢會員資料
router.get("/", function (req, res) {
  const sql = "SELECT * FROM member";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
//新增會員資料
router.post("/insert", function (req, res) {
  const sql = `INSERT INTO \`member\`(\`mName\`,\`mAccount\`,\`mPassword\`,\`mGender\`,\`mBday\`,\`mPhone\`,\`mEmail\`,\`mAddress\`, \`created_at\`)VALUES(?,?,?,?,?,?,?,?,NOW())`
  db.queryAsync(sql),[
    req.body.mName,
    req.body.mAccount,
    req.body.mPassword,
    req.body.mGender,
    req.body.mday,
    req.body.mPhone,
    req.body.mEmail,
    req.body.mAddress,]
  .then(result => {
    return res.json(result);
  })
  .catch(err=>{
    console.log(err)
});
});
module.exports = router;