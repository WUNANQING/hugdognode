var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

//查看會員收藏清單
router.get("/:mId?",(req,res)=>{
  const sql=`SELECT * FROM list INNER JOIN product ON list.id = product.pId WHERE mId = ? ORDER BY id DESC`
  db.queryAsync(sql,req.params.mId).then(result=>{
    return res.json(result)
  })

})
//新增清單
router.post("/post", (req, res) => {
  const output={
                success:false,
                result:{}
              }
  const s_sql=`SELECT * FROM \`list\` WHERE mId = ? AND list = ?`
  const sql = `INSERT INTO \`list\`(\`list\`, \`created_at\`, \`mId\`) VALUES (?, NOW(), ?)`;
  db.queryAsync(s_sql,[req.body.mId,req.body.item]).then(result=>{
    // console.log(result.length)
    if(result.length === 0) {  
    db.queryAsync(sql, [
      req.body.item,req.body.mId
    ])
      .then(r => {
        output.success=true
        output.result=r
        return res.json(output);
      })
      .catch(err => {
        console.log(err);
      });
    }else {
      return res.json(output)
    }
  })
});
module.exports = router;