var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();
//檔案上傳
const multer = require("multer");
//檔案上傳暫存
const upload = multer({ dest: "tmp_uploads/" });
//處理時間格式
const moment = require("moment-timezone");

//資料庫連線函式
const dbQuery = (sql, res, sqlParam) => {
  db.queryAsync(sql, sqlParam)
    .then(r => {
      return res.json(r);
    })
    .catch(error => {
      error.msg = "資料庫連線操作錯誤";
      return res.json(error);
    });
};

//-----列表頁分頁查詢-----
router.get("/query/:page", (req, res) => {
  const perPage = 10; //每頁資料顯示筆數
  let data = {}; //傳至前端資料
  let totalRows; //資料總數
  let totalPages; //總頁數
  let page = req.params.page ? parseInt(req.params.page) : 1;

  let sql = `SELECT COUNT(1) AS num FROM service_user WHERE dataSts='Y'`;
  if (req.query.sCity) {
    sql += ` AND sCity='${req.query.sCity}'`;
  }
  if (req.query.sType) {
    sql += ` AND sTypePrice like '%${req.query.sType}%'`;
  }
  if (req.query.sExtra) {
    let sExtra = req.query.sExtra.split(",");
    if (sExtra.length) {
      for (let i = 0; i < sExtra.length; i++) {
        if (i === 0) {
          sql += ` AND (FIND_IN_SET('${sExtra[i]}',sExtra)`;
        } else {
          sql += ` OR FIND_IN_SET('${sExtra[i]}',sExtra)`;
        }
      }
      sql += ")";
    }
  }
  if (req.query.sSort) {
    let sSortSql = req.query.sSort.split("_").join(" ");
    sql += ` ORDER BY ${sSortSql}`;
  }
  db.queryAsync(sql).then(r1 => {
    if (req.query.showTotalPage === "Y") {
      return res.json(r1);
    }
    data.totalRows = totalRows = r1[0].num;
    data.totalPages = totalPages = Math.ceil(totalRows / perPage);
    //限定page範圍
    data.page = page >= totalPages ? (page = totalPages) : page;
    data.page = page < 1 ? (page = 1) : page;

    let sql = `SELECT * FROM service_user WHERE dataSts='Y'`;

    if (req.query.sCity) {
      sql += ` AND sCity='${req.query.sCity}'`;
    }
    if (req.query.sType) {
      sql += ` AND sTypePrice like '%${req.query.sType}%'`;
    }
    if (req.query.sExtra) {
      let sExtra = req.query.sExtra.split(",");
      if (sExtra.length) {
        for (let i = 0; i < sExtra.length; i++) {
          if (i === 0) {
            sql += ` AND (FIND_IN_SET('${sExtra[i]}',sExtra)`;
          } else {
            sql += ` OR FIND_IN_SET('${sExtra[i]}',sExtra)`;
          }
        }
        sql += ")";
      }
    }
    if (req.query.sSort) {
      let sSortSql = req.query.sSort.split("_").join(" ");
      console.log(sSortSql);
      sql += ` ORDER BY ${sSortSql}`;
      sql += `,\`created_at\` DESC LIMIT ${perPage * (page - 1)},${perPage}`;
    } else {
      sql += ` ORDER BY \`created_at\` DESC LIMIT ${perPage *
        (page - 1)},${perPage}`;
    }
    console.log(sql);
    dbQuery(sql, res);
  });
});
// -----service_user-----
//新增資料
router.post("/user/insert/:userId", upload.none(), (req, res) => {
  const sql = `INSERT INTO \`service_user\` (\`mId\`,\`sName\`, \`sPhone\`, \`sEmail\`, \`sCity\`, \`sDist\`, \`sAddr\`, \`sTitle\`, \`sYear\`, \`sInfo\`, \`sTypePrice\`, \`sSizeId\`, \`sExtra\`, \`isConfirmed\`,\`lat\`,\`lng\`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const sqlParam = [
    req.params.userId,
    req.body.sName,
    req.body.sPhone,
    req.body.sEmail,
    req.body.sCity,
    req.body.sDist,
    req.body.sAddr,
    req.body.sTitle,
    req.body.sYear,
    req.body.sInfo,
    req.body.sTypePrice,
    req.body.sSizeId,
    req.body.sExtra,
    req.body.isConfirmed,
    req.body.lat,
    req.body.lng
  ];
  dbQuery(sql, res, sqlParam);
});
//修改資料
router.post("/user/edit/:userId", upload.none(), (req, res) => {
  const sql = `UPDATE \`service_user\` SET \`sName\`=?, \`sPhone\`=?, \`sEmail\`=?, \`sCity\`=?, \`sDist\`=?, \`sAddr\`=?, \`sTitle\`=?, \`sYear\`=?, \`sInfo\`=?, \`sTypePrice\`=?, \`sSizeId\`=?, \`sExtra\`=?,\`lat\`=?,\`lng\`=?, \`updated_at\`=? WHERE \`id\`=?`;
  const datetime = moment(Date.now())
    .tz("Asia/Taipei")
    .format("YYYY-MM-DD HH:mm:ss");
  const sqlParam = [
    req.body.sName,
    req.body.sPhone,
    req.body.sEmail,
    req.body.sCity,
    req.body.sDist,
    req.body.sAddr,
    req.body.sTitle,
    req.body.sYear,
    req.body.sInfo,
    req.body.sTypePrice,
    req.body.sSizeId,
    req.body.sExtra,
    req.body.lat,
    req.body.lng,
    datetime,
    req.params.userId
  ];
  dbQuery(sql, res, sqlParam);
});
//查詢mId/id
router.get("/user/all", (req, res) => {
  let sql = `SELECT * FROM service_user`;
  if (req.query.dataSts) {
    sql += ` WHERE dataSts='${req.query.dataSts}'`;
    if (req.query.notMid) {
      sql += ` AND mId!='${req.query.notMid}'`;
    }
  }
  dbQuery(sql, res);
});
router.get("/user/:userId", (req, res) => {
  let sql = `SELECT * FROM service_user`;
  if (req.query.mId) {
    sql += ` WHERE mId='${req.query.mId}'`;
  } else {
    sql += ` WHERE id='${req.params.userId}'`;
  }
  if (req.query.dataSts) {
    sql += ` AND dataSts='${req.query.dataSts}'`;
  }
  dbQuery(sql, res);
});
//-----service_order 訂單-----
//列表查詢
router.get("/order/:userId", (req, res) => {
  let sql = `SELECT * FROM service_order  WHERE sId='${req.params.userId}'`;
  if (req.query.orderStsId) {
    sql += ` AND orderStsId=${req.query.orderStsId}`;
  }
  sql += " order by created_at desc";
  console.log(sql);
  dbQuery(sql, res);
});
//列表查詢
router.get("/order/sPrice/:userId", (req, res) => {
  let sql = `SELECT sPrice FROM service_order  WHERE sId='${req.params.userId}' AND orderStsId<>'o01' AND orderStsId<>'o02'`;
  console.log(sql);
  dbQuery(sql, res);
});
//新增訂單
router.post("/order/insert/:userId", upload.none(), (req, res) => {
  const sql = `INSERT INTO \`service_order\` (\`orderId\`,\`sId\`, \`orderStsId\`, \`mId\`, \`mAddr\`, \`mCity\`, \`mDist\`, \`mPhone\`, \`sTypeId\`, \`sPrice\`, \`sTimeStart\`, \`sTimeEnd\`, \`dName\`, \`dBreed\`, \`dAge\`, \`dGender\`, \`sizeId\`, \`extraId\`, \`sRemark\`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const sqlParam = [
    req.body.orderId,
    req.params.userId,
    req.body.orderStsId,
    req.body.mId,
    req.body.mAddr,
    req.body.mCity,
    req.body.mDist,
    req.body.mPhone,
    req.body.sTypeId,
    req.body.sPrice,
    moment(req.body.sTimeStart)
      .tz("Asia/Taipei")
      .format("YYYY-MM-DD HH:mm:ss"),
    moment(req.body.sTimeEnd)
      .tz("Asia/Taipei")
      .format("YYYY-MM-DD HH:mm:ss"),
    req.body.dName,
    req.body.dBreed,
    req.body.dAge,
    req.body.dGender,
    req.body.sizeId,
    req.body.extraId,
    req.body.sRemark
  ];
  dbQuery(sql, res, sqlParam);
});
//內頁查詢
router.get("/orderdetail/:orderId", (req, res) => {
  let sql = `SELECT * FROM service_order  WHERE orderId='${req.params.orderId}'`;
  if (req.query.orderStsId) {
    sql += ` AND orderStsId=${req.query.orderStsId}`;
  }
  if (req.query.mId) {
    sql += ` AND mId=${req.query.mId}`;
  }
  dbQuery(sql, res);
});
//內頁修改訂單狀態
router.post("/orderdetail/ordersts/:orderId", upload.none(), (req, res) => {
  let sql = `UPDATE \`service_order\` SET \`orderStsId\`=? WHERE \`orderId\`=?`;
  const sqlParam = [req.body.ordersts, req.params.orderId];
  console.log(sqlParam);
  dbQuery(sql, res, sqlParam);
});
//-----service_order 訂單狀態-----
//查詢
router.get("/ordersts", (req, res) => {
  let sql = `SELECT * FROM service_ordersts`;
  dbQuery(sql, res);
});
// -----service_comment 評論-----
router.get("/comment/:userId", (req, res, next) => {
  let sql = `SELECT * FROM service_comment WHERE sId='${req.params.userId}'`;
  if (req.query.order) {
    sql += ` order by ${req.query.order} desc`;
  }
  if (req.query.limit) {
    sql += ` limit ${req.query.limit}`;
  }
  dbQuery(sql, res);
});
router.post("/comment/insert/:orderId", upload.none(), (req, res, next) => {
  const sql = `INSERT INTO \`service_comment\` (\`orderId\`,\`mId\`,\`sId\`, \`commentTxt\`,  \`rating\`) VALUES (?,?,?,?,?)`;
  const sqlParam = [
    req.body.orderId,
    req.body.mId,
    req.body.sId,
    req.body.commentTxt,
    req.body.rating
  ];
  dbQuery(sql, res, sqlParam);
});
// -----service_type 服務類型-----
router.get("/type", (req, res, next) => {
  let sql = `SELECT * FROM service_type`;
  dbQuery(sql, res);
});
// -----service_size 狗狗體型-----
router.get("/size", (req, res, next) => {
  let sql = `SELECT * FROM service_size`;
  dbQuery(sql, res);
});
// -----service_photo 相片-----
router.get("/photo/:mId", (req, res, next) => {
  let sql = `SELECT * FROM service_photo WHERE mId='${req.params.mId}'`;
  if (req.query.category) {
    sql += ` AND category=${req.query.category}`;
  }
  sql += " AND dataSts='Y' order by created_at desc";
  dbQuery(sql, res);
});
// router.get("/photo", (req, res, next) => {
//   let sql = `SELECT * FROM service_photo WHERE sId!=''`;
//   if (req.query.category) {
//     sql += ` AND category=${req.query.category}`;
//   }
//   sql += " AND dataSts='Y' order by created_at desc";
//   dbQuery(sql, res);
// });
// -----service_extra 額外服務項目-----
router.get("/extra", (req, res, next) => {
  let sql = `SELECT * FROM service_extra`;
  dbQuery(sql, res);
});
// -----查詢縣市區域-----
// 查詢所有縣市
router.get("/zipcode/city", (req, res, next) => {
  let sql = `SELECT \`City\` FROM \`zipcode\` WHERE \`dataSts\`='Y' GROUP BY \`City\` ORDER BY \`ZipCode\``;
  dbQuery(sql, res);
});
// 查詢縣市下的區域
router.get("/zipcode/city/:city", (req, res, next) => {
  let sql = `SELECT \`Area\` FROM \`zipcode\` WHERE City=${req.params.city} ORDER BY \`ZipCode\``;
  dbQuery(sql, res);
});
//-----查會員資訊-----
router.get("/member", (req, res, next) => {
  let sql = `SELECT \`mId\`,\`mName\`,\`mImg\`,\`mPhone\`,\`mEmail\` FROM member`;
  if (req.query.mId) {
    sql += ` WHERE \`mId\`=${req.query.mId}`;
  }
  console.log(sql);
  dbQuery(sql, res);
});
//-----收藏-----
router.get("/like/:sId/:mId", (req, res) => {
  let sql = `SELECT * FROM service_like  WHERE sId='${req.params.sId}' AND mId='${req.params.mId}'`;
  dbQuery(sql, res);
});
router.get("/like/:action/:sId/:mId", (req, res) => {
  let sql, sqlParam;
  if (req.params.action === "insert") {
    sql = `INSERT INTO \`service_like\`  (\`sId\`,\`mId\`) VALUES (?,?)`;
  } else if (req.params.action === "del") {
    sql = `DELETE FROM \`service_like\` WHERE \`sId\`=? AND \`mId\`=?`;
  }
  sqlParam = [req.params.sId, req.params.mId];
  dbQuery(sql, res, sqlParam);
});
module.exports = router;
