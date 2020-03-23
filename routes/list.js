var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();
//新增清單(未改)
router.post("/post", (req, res) => {
    const sql = `INSERT INTO \`list\`(\`list\`, \`created_at\`, \`mId\`) VALUES (?, NOW(), ?)`;
    db.queryAsync(sql, [
      req.body.item,req.body.mId
    ])
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
module.exports = router;