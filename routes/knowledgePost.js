var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();



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

    const sql = `INSERT INTO \`knowledge_questions\` (\`mId\`, \`mName\`, \`qAge\`, \`qTitle\`, \`qClassify\`, \`qType\`, \`qDes\`, \`created_at\) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
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