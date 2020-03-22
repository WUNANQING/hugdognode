var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();



//blog資料
router.get("/blog", function(req, res){
    const sql = `SELECT * FROM knowledge_blogs LIMIT 5 `;
    
    db.queryAsync(sql).then(result =>{
        console.log(result)
        return res.json(result);
    })
})
// //進階資料
// router.get("/blog/:bId?", function(req, res){
//     const sql =`SELECT * FROM knowledge_blogs WHERE bId = ?`
//     console.log(req.params.bId)
//     db.queryAsync(sql, [req.params.bId]).then(result=>{return res.json(result)})
// })


// //partner資料
// router.get("/partner", function(req, res){
//     const sql = `SELECT * FROM knowledge_partners`;
//     db.queryAsync(sql).then(result =>{
//         return res.json(result);
//     })
// })
// //進階資料
// router.get("/partner/:pId?", function(req, res){
//     const sql =`SELECT * FROM knowledge_partners WHERE pId = ?`
//     console.log(req.params.pId)
//     db.queryAsync(sql, [req.params.pId]).then(result=>{return res.json(result)})
// })


// //question資料
// router.get("/question", function(req, res){
//     const sql = `SELECT * FROM knowledge_questions`;
//     db.queryAsync(sql).then(result =>{
//         return res.json(result);
//     })
// })
// //進階資料
// router.get("/question/:qId?", function(req, res){
//     const sql =`SELECT * FROM knowledge_questions WHERE qId = ?`
//     console.log(req.params.qId)
//     db.queryAsync(sql, [req.params.qId]).then(result=>{return res.json(result)})
// })

module.exports = router;