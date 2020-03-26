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
    cb(null, "public/uploads/service/album");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage }).array("file");
router.post("/album/:mId", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    // console.log(req.files);
    //查詢舊的檔案
    let query = `SELECT * FROM service_photo WHERE mId=${req.params.mId} AND category='2'`;
    db.queryAsync(query).then(r => {
      //刪除檔案
      r.forEach(v => {
        fs.unlink(
          __dirname +
            "/../public/uploads/service/album/" +
            v.fileName +
            "." +
            v.fileType,
          error => {
            console.log(error);
          }
        );
      });
    });
    //刪除資料
    let del = `DELETE FROM service_photo WHERE mId=${req.params.mId} AND category='2'`;
    db.queryAsync(del);
    //新增資料
    req.files.forEach(v => {
      let ins = `INSERT INTO \`service_photo\` (\`mId\`,\`category\`, \`fileName\`, \`fileType\`) VALUES (?,?,?,?)`;
      let file = `${v.filename}`.toString().split(".");
      let sqlParam = [req.params.mId, "2", file[0], file[file.length - 1]];
      db.queryAsync(ins, sqlParam);
    });
    return res.status(200).send(req.files);
  });
});

module.exports = router;
