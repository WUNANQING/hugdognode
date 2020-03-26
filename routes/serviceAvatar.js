var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();
//檔案上傳
const multer = require("multer");
//file system
const fs = require("fs");
//檔案上傳暫存
// const upload = multer({ dest: "tmp_uploads/" });
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

//上傳檔案設定
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/service/avatar");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage }).single("file");
router.post("/avatar/:mId", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    // console.log(res);
    //查詢舊的檔案
    let query = `SELECT * FROM service_photo WHERE mId=${req.params.mId} AND category='1'`;
    db.queryAsync(query).then(r => {
      //刪除檔案
      r.forEach(v => {
        fs.unlink(
          __dirname +
            "/../public/uploads/service/avatar/" +
            v.fileName +
            "." +
            v.fileType,
          error => {
            console.log(error);
          }
        );
      });
    });
    //刪除原有資料
    let del = `DELETE FROM service_photo WHERE mId=${req.params.mId} AND category='1'`;
    db.queryAsync(del);
    //使用智者驗證通過
    const upd = `UPDATE \`service_user\` SET \`isConfirmed\`=? WHERE \`id\`=?`;
    const updSqlParam = ["Y", req.params.mId];
    db.queryAsync(upd, updSqlParam);
    //新增照片
    let ins = `INSERT INTO \`service_photo\` (\`mId\`,\`category\`, \`fileName\`, \`fileType\`) VALUES (?,?,?,?)`;
    let file = `${req.file.filename}`.toString().split(".");
    const sqlParam = [req.params.mId, "1", file[0], file[file.length - 1]];
    return dbQuery(ins, res, sqlParam);
    // return res.status(200).send(req.file);
  });
});

module.exports = router;
