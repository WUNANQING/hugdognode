var express = require("express");
const db = require(__dirname + "/../_connect_db");
const moment = require("moment-timezone");
var router = express.Router();
//商品全部資料
router.get("/:page?", function(req, res) {
  //設定每頁商品筆數;總筆數;總頁數
  const perPage = 18;
  let totalRows, totalPages;
  let page = req.params.page ? parseInt(req.params.page) : 1;

  const whereAr = [];

  const cId = parseInt(req.query.cId);
  if (req.query.cId && cId) {
    whereAr.push("pCategoryId=" + cId);
  }

  const vId = parseInt(req.query.vId);
  if (req.query.vId && vId) {
    whereAr.push("vId=" + vId);
  }

  let whereStr = "";
  if (whereAr.length) {
    whereStr = " WHERE " + whereAr.join(" AND ");
  }

  let orderBy = "";
  switch (req.query.orderBy) {
    case "timeAsc":
      orderBy = " ORDER BY created_at ASC ";
      break;
    case "timeDesc":
      orderBy = " ORDER BY created_at DESC ";
      break;
    case "priceAsc":
      orderBy = " ORDER BY pPrice ASC ";
      break;
    case "priceDesc":
      orderBy = " ORDER BY pPrice DESC ";
      break;
    default:
      //orderBy = ' ORDER BY created_at ASC ';
      break;
  }

  const t_sql = ` SELECT COUNT(1) num FROM product ${whereStr} `;
  const p_sql = ` SELECT * FROM product ${whereStr} ${orderBy} LIMIT ${(page -
    1) *
    perPage}, ${perPage} `;

  db.queryAsync(t_sql)
    .then(result => {
      totalRows = result[0].num;
      totalPages = Math.ceil(totalRows / perPage);
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;

      return db.queryAsync(p_sql);
    })
    //node使用ejs不需要return但此處為前後端連接因此需要return
    .then(result => {
      result.forEach((row,idx)=>{row.created_at=moment(row.created_at).format("YYYY-MM-DD")});
      return res.json({ totalRows, totalPages, page, rows: result });
    });
  /*
  //得到總筆數
  const t_sql = "SELECT COUNT(*) num FROM product";
  //得到特定商品類別筆數
  const c_sql = `SELECT COUNT(*) num FROM product where pCategoryId = ?`;
  //得到特定商品品牌比數
  const v_sql = `SELECT COUNT(*) num FROM product where vId = ?`;
  //設定判斷式;若得到商品種類cId
  if (req.query.cId) {
    db.queryAsync(c_sql, [req.query.cId])
      .then(result => {
        totalRows = result[0].num;
        totalPages = Math.ceil(totalRows / perPage);
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        //按照商品編號順序,DESC為倒序
        const sql = `SELECT * FROM \`product\` where pCategoryId = ? ORDER BY pId ASC LIMIT  ${(page -
          1) *
          perPage}, ${perPage}`;
        return db.queryAsync(sql, [req.query.cId]);
      })
      //node使用ejs不需要return但此處為前後端連接因此需要return
      .then(result => {
        return res.json({ totalRows, totalPages, page, rows: result });
      });
      //若得到商品品牌vId
  } else if (req.query.vId) {
    db.queryAsync(v_sql, [req.query.vId])
      .then(result => {
        totalRows = result[0].num;
        totalPages = Math.ceil(totalRows / perPage);
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        const sql = `SELECT * FROM \`product\` where vId = ? ORDER BY pId ASC LIMIT  ${(page -
          1) *
          perPage}, ${perPage}`;
        return db.queryAsync(sql, [req.query.vId]);
      })
      .then(result => {
        return res.json({ totalRows, totalPages, page, rows: result });
      });
  } else if (req.params.page || req.params.page === undefined) {
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
      .then(result => {
        return res.json({ totalRows, totalPages, page, rows: result });
      });
  }

  */
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
