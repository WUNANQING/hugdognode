var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();



//blog資料
router.get("/blog", function(req, res){
    const sql = `SELECT * FROM knowledge_blogs `;
    
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
router.get("/partner/:pId?", function(req, res){
    const sql =`SELECT * FROM knowledge_partners WHERE pId = ?`
    console.log(req.params.pId)
    db.queryAsync(sql, [req.params.pId]).then(result=>{return res.json(result)})
})


//question資料
router.get("/question", function(req, res){
    const sql = `SELECT * FROM knowledge_questions ORDER BY id DESC`;
    db.queryAsync(sql).then(result =>{
        return res.json(result);
    })
})
//進階資料
router.get("/question/:qId?", function(req, res){
    const sql =`SELECT * FROM knowledge_questions WHERE qId = ?`
    console.log(req.params.qId)
    db.queryAsync(sql, [req.params.qId]).then(result=>{return res.json(result)})
})




//
//question發問題

//先查看會員有無寵物資料
router.get("/:mId?",(req,res)=>{
    const sql=`SELECT * FROM member INNER JOIN dog ON member.mid = dog.mId WHERE dName = ? ORDER BY dName`
    db.queryAsync(sql,req.params.mId).then(result=>{
      return res.json(result)
})
})

//新增問題
router.post("/question/ask", (req, res)=>{
    const output={
        success:false,
        result:{}
      }

      console.log(req.body)
    const sql = `INSERT INTO \`knowledge_questions\` (\`mId\`, \`mName\`, \`qAge\`, \`qTitle\`, \`qClassify\`, \`qType\`, \`qDes\`, \`created_at\`) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
    db.queryAsync(sql, [
        req.body.mId,
        req.body.mName,
        req.body.dogYear,
        req.body.askTitle,
        req.body.classify,
        req.body.type, 
        req.body.askTxt       
      ])
      .then(w=>{
          output.success=true;
          output.result=w
          return res.json(output);
      })
      .catch(error=>{
          console.log(error);
          return res.json(output);
      })
});



module.exports = router;