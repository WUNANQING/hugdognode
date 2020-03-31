var express = require("express");
const db = require(__dirname + "/../_connect_db");
const moment = require("moment-timezone");
var router = express.Router();
//顯示評論
router.get("/:pId", (req, res) => {
  let likes, dislikes;
  const l_sql = `SELECT COUNT(*) likes FROM product_comment WHERE rating = 1 AND pId = ?`;
  const d_sql = `SELECT COUNT(*) dislikes FROM product_comment WHERE rating = 0 AND pId = ?`;
  const sql = `SELECT member.mAccount, member.mImg, member.mId, product_comment.id, product_comment.rating, product_comment.comment, product_comment.updated_at FROM product_comment INNER JOIN member ON product_comment.mId = member.mId WHERE pId = ?`;

  db.queryAsync(l_sql,[req.params.pId])
    .then(result => {
      likes = result[0].likes;
      return db.queryAsync(d_sql,[req.params.pId]);
    })
    .then(result => {
      dislikes = result[0].dislikes;
      return db.queryAsync(sql, [req.params.pId]);
    })
    .then(result => {
      console.log({ likes, dislikes, rows: result });
      return res.json({ likes, dislikes, rows: result });
    });
});

//新增評論
router.post("/post", (req, res) => {
  const sql = `INSERT INTO product_comment (pId, mId, comment, rating, created_at) VALUES (?, ?, ?, ?, NOW())`;
  db.queryAsync(sql, [
    req.body.pId,
    req.body.mId,
    req.body.content,
    req.body.rating
  ])
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});
//刪除評論
router.post('/del/:id/:mId',(req,res)=>{
  const sql=`DELETE FROM product_comment WHERE id = ? AND mId = ?`
  db.queryAsync(sql,[req.params.id,req.params.mId]).then(result=>{return res.json(result)})

})
//編輯評論
router.post('/edit/:id/:mId',(req,res)=>{
  const sql = `UPDATE product_comment SET rating = ?, comment = ? WHERE id = ? AND mId = ?`
  db.queryAsync(sql,[req.body.rating, req.body.content, req.params.id, req.params.mId]).then(result=>{return res.json(result)})
})
module.exports = router;
