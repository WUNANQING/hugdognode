var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

//新增訂單
router.post("/post", (req, res) => {
  const sql = `INSERT INTO \`orders\`(\`name\`, \`address\`, \`zip\`, \`email\`, \`mobile\`, \`card\`, \`cardNumber\`, \`owner\`, \`cart\`, \`created_at\`, \`mId\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`;
  db.queryAsync(sql, [
    req.body.lastName + req.body.firstName,
    req.body.county + req.body.address + req.body.detailedAddress,
    req.body.zip,
    req.body.email,
    req.body.mobile,
    req.body.card,
    req.body.cardNumber,
    req.body.owner,  
    req.body.cart,
    req.body.mId
  ])
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});
//訂單細節資料
router.get("/:mId?", function(req, res) {
  const sql = `SELECT * FROM orders WHERE mId = ? ORDER BY id DESC LIMIT 1`;
  console.log(req.params.mId);
  db.queryAsync(sql, [req.params.mId]).then(result => {
    return res.json(result);
  });
});
module.exports = router;
