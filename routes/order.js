var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

//新增訂單
router.post('/post',(req,res)=>{
    const sql = `INSERT INTO \`orders\`(\`name\`, \`address\`, \`zip\`, \`email\`, \`mobile\`, \`cardNumber\`, \`owner\`, \`cart\`, \`created_at\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
    db.queryAsync(sql,[req.body.lastName+req.body.firstName,
                       req.body.county+req.body.address+req.body.detailedAddress,
                       req.body.zip,
                       req.body.email,
                       req.body.mobile,
                       req.body.cardNumber,
                       req.body.owner,
                       req.body.cart,])
        .then(result=>{
            return res.json(result);
        })
        .catch(err=>{
            console.log(err)
        })
})
//訂單細節資料
router.get("/:orderId?", function (req, res) {
    const sql = `SELECT * FROM orders WHERE id = ?`
    console.log(req.params.orderId)
    db.queryAsync(sql, [req.params.orderId]).then(result => { return res.json(result) })
})
module.exports = router;
