var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();



//blog資料
router.get("/blog", function(req, res){
    const sql = `SELECT * FROM knowledge_blogs ORDER BY bId DESC `;
    
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
    const sql = `SELECT * FROM knowledge_partners ORDER BY id DESC`;
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
router.post("/question/ask:mId?", (req, res)=>{
    const output={
        success:false,
        result:{}
      }

    //   console.log(req.body)

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

//刪除問題
router.post("/question/del/:id", (req,res)=>{
    const output={
        success:false,
        result:{}
    }
    
    const sql = `DELETE FROM \`knowledge_questions\` WHERE \`id\` = ?`
    db.queryAsync(sql, [req.params.id]).then(r => {
        console.log(r);
        output.success = true;
        output.result = r.affectedRows;
        return res.json(output);
      });
})

//partner發起活動
router.post("/partner/open", (req, res)=>{
    const output={
        success:false,
        result:{}
      }

      console.log(req.body)

    const sql = `INSERT INTO \`knowledge_partners\` (\`mId\`, \`mName\`, \`pTitle\`, \`pDate\`, \`pTime\`, \`pLocation\`, \`pNumber\`, \`pNumberLimit\`, \`pDes\`, \`created_at\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
    db.queryAsync(sql, [
        req.body.mId,
        req.body.mName,
        req.body.pTitle,
        req.body.pDate,
        req.body.pTime,
        req.body.pLocation, 
        req.body.pNumber, 
        req.body.pNumberLimit,
        req.body.pDes   
      ])
      .then(p=>{
          output.success=true;
          output.result=p
          return res.json(output);
      })
      .catch(error=>{
          console.log(error);
          return res.json(output);
      })
});

//partner 其他+1
router.get("/partner/plus", function(req,res){
    const sql = `SELECT * FROM knowledge_partner_sign INNER JOIN knowledge_partners ON knowledge_partner_sign.pid = knowledge_partners.id WHERE mid = ?`;
    const count_sql =`SELECT COUNT(pId) FROM knowledge_partner_sign INNER JOIN knowledge_partners ON knowledge_partner_sign.pId = knowledge_partners.id WHERE knowledge_partner_sign.mId = ?`;
    
    db.queryAsync(sql, req.params.pJoinName).then(result => {
        return res.json(result);
      });
})

router.post("/partner/plus:mId?", (req, res)=>{
    const output={
        success:false,
        result:{}
      }

      console.log(req.body)
    const sql =`INSERT INTO \`knowledge_partner_sign\` ( \`pId\`, \`pJoin\`, \`mId\`, \`pJoinName\`, \`created_at\`) VALUES (?, ?, ?, ?, NOW())`;
    db.queryAsync(sql, [
        req.body.pId,
        req.body.pJoin,
        req.body.mId,
        req.body.pJoinName, 
      ])
      .then(result=>{
        //   output.success=true;
        //   output.result=p
          return res.json(result);
      })
      .catch(error=>{
          console.log(error);
        //   return res.json(output);
      })
});


//partner 參加sql
router.get("/partner/plus/:mId", function(req,res){
    const sql = `SELECT * FROM knowledge_partner_sign INNER JOIN knowledge_partners ON knowledge_partner_sign.pId = knowledge_partners.id WHERE knowledge_partner_sign.mId = ?`;
    const count_sql = 
    db.queryAsync(sql, req.params.mId).then(result => {
        console.log(result)
        return res.json(result);
      });
})


//partner 刪除+1
router.post("/partner/del/:pId", (req,res)=>{
    const output={
        success:false,
        result:{}
    }
    
    const sql = `DELETE FROM \`knowledge_partner_sign\` WHERE \`pId\` = ?`
    db.queryAsync(sql, [req.params.pId]).then(r => {
        console.log(r);
        output.success = true;
        output.result = r.affectedRows;
        return res.json(output);
      });
})


module.exports = router; 