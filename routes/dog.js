var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();
//查詢會員資料
router.get("/", function (req, res) {
  const sql = "SELECT * FROMddog";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
// //新增會員資料
// router.post("/insert", function (req, res) {
//   const sql = `INSERT INTO \`member\`(\`mName\`,\`mAccount\`,\`mPassword\`,\`mImg\`,\`mGender\`,\`mBday\`,\`mPhone\`,\`mEmail\`,\`mAddress\`, \`created_at\`, \`updated_at\`)VALUES(?,?,?,?,?,?,?,?,?,NOW(),NOW())`
//   db.queryAsync(sql,[
//     req.body.mName,
//     req.body.mAccount,
//     req.body.mPassword,
//     req.body.mImg,
//     req.body.mGender,
//     req.body.mBday,
//     req.body.mPhone,
//     req.body.mEmail,
//     req.body.mAddress,])
//   .then(result => {
//     return res.json(result);
//   })
//   .catch(err=>{
//     console.log(err)
// });
// });
// router.get("/order", function (req, res) {
//   const sql = "SELECT * FROM orders";
//   db.queryAsync(sql).then(result => {
//     return res.json(result);
//   });
// });
module.exports = router;