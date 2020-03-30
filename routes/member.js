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
//查詢會員資料
router.get("/:mId?", function (req, res) {
  const sql = "SELECT * FROM member where mId=?";
  db.queryAsync(sql,req.params.mId).then(result=>{
    return res.json(result)
  })
});
//修改會員資料
router.post("/update/:mId?", function (req, res) {
  const sql = `UPDATE \`member\` SET \`mName\`=?,\`mAccount\`=?,\`mPassword\`=?,\`mImg\`=?,\`mGender\`=?,\`mBday\`=?,\`mPhone\`=?,\`mEmail\`=?,\`mAddress\`=?,\`updated_at\`=NOW() WHERE \`mId\` = ?`
  db.queryAsync(sql,[
    
    req.body.mName,
    req.body.mAccount,
    req.body.mPassword,
    req.body.mImg,
    req.body.mGender,
    req.body.mBday,
    req.body.mPhone,
    req.body.mEmail,
    req.body.mAddress,
    req.body.mId
  ]).then(result => {
    return res.json(result);
  });
});
//新增會員資料
router.post("/insert", function (req, res) {
  const sql = `INSERT INTO \`member\`(\`mName\`,\`mAccount\`,\`mPassword\`,\`mImg\`,\`mGender\`,\`mBday\`,\`mPhone\`,\`mEmail\`,\`mAddress\`, \`created_at\`, \`updated_at\`)VALUES(?,?,?,?,?,?,?,?,?,NOW(),NOW())`
  db.queryAsync(sql,[
    req.body.mName,
    req.body.mAccount,
    req.body.mPassword,
    req.body.mImg,
    req.body.mGender,
    req.body.mBday,
    req.body.mPhone,
    req.body.mEmail,
    req.body.mAddress,])
  .then(result => {
    return res.json(result);
  })
  .catch(err=>{
    console.log(err)
});
});
// router.get("/order", function (req, res) {
//   const sql = "SELECT * FROM orders";
//   db.queryAsync(sql).then(result => {
//     return res.json(result);
//   });
// });
//blog資料
router.get("/blog", function(req, res){
  const sql = `SELECT * FROM knowledge_blogs LIMIT 5 `;
  
  db.queryAsync(sql).then(result =>{
      console.log(result)
      return res.json(result);
  })
})
//進階資料
router.get("/blog/:aId?", function(req, res){
  const sql =`SELECT * FROM knowledge_blogs WHERE aId = ?`
  console.log(req.params.aId)
  db.queryAsync(sql, [req.params.aId]).then(result=>{return res.json(result)})
})


//partner資料
router.get("/partner", function(req, res){
  const sql = `SELECT * FROM knowledge_partners`;
  db.queryAsync(sql).then(result =>{
      return res.json(result);
  })
})
//進階資料
router.get("/partner/:mId?", function(req, res){
  const sql =`SELECT * FROM knowledge_partners WHERE mId = ?`
  console.log(req.params.mId)
  db.queryAsync(sql, [req.params.mId]).then(result=>{return res.json(result)})
})


//question資料
router.get("/question", function(req, res){
  const sql = `SELECT * FROM knowledge_questions ORDER BY mId DESC`;
  db.queryAsync(sql).then(result =>{
      return res.json(result);
  })
})
//進階資料
router.get("/question/:mId?", function(req, res){
  const sql =`SELECT * FROM knowledge_questions WHERE mId = ?`
  console.log(req.params.mId)
  db.queryAsync(sql, [req.params.mId]).then(result=>{return res.json(result)})
})

//-----service_order 訂單-----
//order資料
router.get("/Sorder", function(req, res){
  const sql = `SELECT * FROM service_order ORDER BY mId DESC`;
  db.queryAsync(sql).then(result =>{
      return res.json(result);
  })
})
//列表查詢
router.get("/Sorder/:mId?", function(req, res){
  const sql =`SELECT * FROM service_order WHERE mId = ?`
  console.log(req.params.mId)
  db.queryAsync(sql, [req.params.mId]).then(result=>{return res.json(result)})
})
//查看會員收藏清單
router.get("/list/:mId?",(req,res)=>{
  const sql=`SELECT list.id AS 'LId',product.pName AS 'pName',product.pId AS 'pId',product.pInfo AS 'pInfo',product.pPrice AS 'pPrice',product.pImg AS 'pImg' FROM list INNER JOIN product ON list.id = product.pId WHERE mId = ? ORDER BY id DESC`
  db.queryAsync(sql,req.params.mId).then(result=>{
    return res.json(result)
  })

})
//最愛保母
router.get("/nanny/:mId?",(req,res)=>{
  const sql=`SELECT service_user.id as 'id',service_user.sName as 'name',service_user.sCity as 'city',service_user.sAddr as 'addr',service_user.sDist as 'dist',service_user.sEmail as 'email',service_user.sPhone as 'phone' FROM service_like INNER JOIN service_user WHERE service_user.id=service_like.sId`
  db.queryAsync(sql,req.params.mId).then(result=>{
    return res.json(result)
  })

})

//blog資料
router.get("/comment", function(req, res){
  const sql = `SELECT * FROM service_comment `;
  
  db.queryAsync(sql).then(result =>{
      console.log(result)
      return res.json(result);
  })
})
//列表查詢
router.get("/comment/:mId?", function(req, res){
  const sql =`SELECT service_comment.sId as 'id',service_comment.commentTxt as 'txt',service_comment.rating as 'rating',service_user.sName as 'name' FROM service_comment INNER JOIN service_user WHERE service_comment.sId = service_user.id = ?`
  console.log(req.params.mId)
  db.queryAsync(sql, [req.params.mId]).then(result=>{return res.json(result)})
})
module.exports = router;