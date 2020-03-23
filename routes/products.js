var express = require("express");
const db = require(__dirname + "/../_connect_db");
const url = require("url");
var router = express.Router();
//商品全部資料
router.get("/:page?", function(req, res) {
  //設定每頁商品筆數;總筆數;總頁數
  const perPage = 18;
  let totalRows, totalPages;
  let page = req.params.page ? parseInt(req.params.page) : 1;
  //得到總筆數
  const t_sql = "SELECT COUNT(*) num FROM product";
  db.queryAsync(t_sql)
    .then(result => {
      totalRows = result[0].num;
      totalPages = Math.ceil(totalRows / perPage);
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;
      const sql = `SELECT * FROM \`product\` ORDER BY pId ASC LIMIT  ${(page -
        1) *
        perPage}, ${perPage}`;
      return db.queryAsync(sql);
    })
    //node使用ejs不需要return但此處為前後端連接因此需要return
    .then(result => {
      return res.json({ totalRows, totalPages, page, rows: result });
    });
});
//商品類別資料
router.get("/category", function(req, res) {
  
});
//商品細節資料
router.get("/productDetail/:pId", function(req, res) {
  console.log(req.params.pId);
  const sql = `SELECT * FROM product WHERE pId = ?`;
  db.queryAsync(sql, [req.params.pId]).then(result => {
    return res.json(result);
  });
});
module.exports = router;
