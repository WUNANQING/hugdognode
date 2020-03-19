var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();
//商品全部資料
router.get("/", function(req, res) {
  const sql = "SELECT * FROM product";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
//商品細節資料
router.get("/:pId?",function(req,res){
  const sql =`SELECT * FROM product WHERE pId = ?`
  console.log(req.params.pId)
  db.queryAsync(sql,[req.params.pId]).then(result=>{return res.json(result)})
})
module.exports = router;
