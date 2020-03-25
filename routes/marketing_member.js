var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.post("/insert", function (req, res) {
  const sql = `INSERT INTO \`marketing_member\`(\`mId\`,\`mName\`,\`mtId\`,\`mtName\`,\`used\`,\`timeget\`,\`endtime\`,\`verify\`, \`created_at\`, \`updated_at\`)VALUES(?,?,?,?,0,NOW(),?,?,NOW(),NOW())`
  db.queryAsync(sql,[
    req.body.userId,
    req.body.username,
    req.body.marketingId,
    req.body.marketingName,
    req.body.endtime,
    req.body.verify,
])
  .then(result => {
    return res.json(result);
  })
  .catch(err=>{
    console.log(err)
});
});
router.get("/couponverify/:verify", function (req, res) {
  const sql = "SELECT * FROM marketing_member WHERE verify = ?";
  console.log(req.params.verify)
  db.queryAsync(sql,[req.params.verify]).then(result=>{return res.json(result)})
});
router.get("/mmId/:mmId", function (req, res) {
  const sql = "SELECT * FROM marketing_member WHERE mmId = ?";
  console.log(req.params.mmId)
  db.queryAsync(sql,[req.params.mmId]).then(result=>{return res.json(result)})
});
router.get("/used/:used/:mId", function (req, res) {
  const sql = "SELECT * FROM marketing_member WHERE used = ? AND mId = ?";
  console.log(req.params.used)
  console.log(req.params.mId)
  db.queryAsync(sql,[req.params.used,req.params.mId]).then(result=>{return res.json(result)})
});
router.get("/used/:mId", function (req, res) {
  const sql = "SELECT * FROM marketing_member WHERE mId = ?";

  console.log(req.params.mId)
  db.queryAsync(sql,[req.params.mId]).then(result=>{return res.json(result)})
});
router.get("/used/:used", function (req, res) {
  const sql = "SELECT * FROM marketing_member WHERE used = ?";
  console.log(req.params.used)
  db.queryAsync(sql,[req.params.used]).then(result=>{return res.json(result)})
});

router.get("/code/:code", function (req, res) {
  const sql = "SELECT * FROM marketing_type WHERE code = ?";
  console.log(req.params.code)
  db.queryAsync(sql,[req.params.code]).then(result=>{return res.json(result)})
});
router.get("/", function (req, res) {
  const sql = "SELECT * FROM marketing_member";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});


module.exports = router;
