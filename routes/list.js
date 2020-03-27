var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

//查看會員收藏清單
router.get("/:mId?", (req, res) => {
  const sql = `SELECT * FROM list INNER JOIN product ON list.itemId = product.pId WHERE mId = ? ORDER BY id DESC`;
  db.queryAsync(sql, req.params.mId).then(result => {
    return res.json(result);
  });
});
//新增商品至清單
router.post("/post", (req, res) => {
  const output = {
    success: false,
    result: {}
  };
  const s_sql = `SELECT * FROM \`list\` WHERE mId = ? AND itemId = ?`;
  const sql = `INSERT INTO \`list\`(\`itemId\`, \`created_at\`, \`mId\`) VALUES (?, NOW(), ?)`;
  db.queryAsync(s_sql, [req.body.mId, req.body.item]).then(result => {
    // console.log(result.length)
    if (result.length === 0) {
      db.queryAsync(sql, [req.body.item, req.body.mId])
        .then(r => {
          output.success = true;
          output.result = r;
          return res.json(output);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return res.json(output);
    }
  });
});
//刪除清單內商品
router.post("/:mId/del/:itemId", (req, res) => {
  const output = {
    success: false,
    result: {}
  };
  const sql = "DELETE FROM `list` WHERE `mId` = ? AND `itemId` =?";
  db.queryAsync(sql, [req.params.mId, req.params.itemId]).then(r => {
    console.log(r);
    output.success = true;
    output.result = r.affectedRows;
    return res.json(output);
  });
});
module.exports = router;
