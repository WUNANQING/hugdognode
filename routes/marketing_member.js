var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.post("/insert", function (req, res) {
  const sql = `INSERT INTO \`marketing_member\`(\`mId\`,\`mName\`,\`mtId\`,\`mtName\`,\`used\`,\`timeget\`,\`endtime\`, \`created_at\`, \`updated_at\`)VALUES(?,?,?,?,0,?,?,NOW(),NOW())`
  db.queryAsync(sql,[
    req.body.mId,
    req.body.mName,
    req.body.mtId,
    req.body.mtName,
    req.body.timeget,
    req.body.endtime,
])
  .then(result => {
    return res.json(result);
  })
  .catch(err=>{
    console.log(err)
});
});
router.get("/mmId/:mmId", function (req, res) {
  const sql = "SELECT * FROM marketing_member WHERE mmId = ?";
  console.log(req.params.mmId)
  db.queryAsync(sql,[req.params.mmId]).then(result=>{return res.json(result)})
});
router.get("/used/:used", function (req, res) {
  const sql = "SELECT * FROM marketing_member WHERE used = ?";
  console.log(req.params.used)
  db.queryAsync(sql,[req.params.used]).then(result=>{return res.json(result)})
});
router.get("/", function (req, res) {
  const sql = "SELECT * FROM marketing_member";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});


module.exports = router;
