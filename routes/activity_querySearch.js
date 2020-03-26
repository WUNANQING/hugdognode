var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.get("/", async (req, res) => {
  let cond;
  let search = req.query.search;
  console.log(search);

  if (req.query.search == null) {
    cond = 1;
  } else {
    searchArr = search;
    searchArr = searchArr.split(/\s+/);
    for (let i in searchArr) {
      if (i == 0) {
        cond = `eName Like "%${searchArr[i]}%" OR eDate LIKE "%${searchArr[i]}%"  OR eInfo LIKE "%${searchArr[i]}%"`;
      } else {
        cond += `OR eName Like "%${searchArr[i]}%" OR eDate LIKE "%${searchArr[i]}%" OR eInfo LIKE "%${searchArr[i]}%" `;
      }
    }
  }
  console.log(cond);

  const t_sql = `SELECT COUNT(1) num FROM activity_event WHERE ${cond} ORDER BY eId ASC`;
  //   const t_sql = "SELECT COUNT(1) num FROM `bulletin` WHERE " + cond + " ORDER BY `bId` ASC";
  const resData = await db.queryAsync(t_sql);

  res.json({
    activity_event: resData
  });
  // totalRows = resData[0].num; // 總筆數
  // totalPages = Math.ceil(totalRows / perPage);

  // // 限定 page 範圍
  // if (page < 1) page = 1;
  // if (page > totalPages) page = totalPages;

  // const sql = `SELECT * FROM activity_class INNER JOIN activity_category ON = vendors.vId INNER JOIN category ON category.cId = bulletin.cId   WHERE ${cond} LIMIT  ${(page -
  //   1) *
  //   perPage}, ${perPage}`;

  // const resData2 = await db.queryAsync(sql);

  // const fm = "YYYY-MM-DD";

  // resData2.forEach((row, idx) => {
  //   row.bDate = moment(row.bDate).format(fm);
  // });

  // const newSql = `SELECT * FROM bulletin WHERE 1  ORDER BY bDate DESC LIMIT 5`;

  // const newData = await db.queryAsync(newSql);

  // newData.forEach((row, idx) => {
  //   row.bDate = moment(row.bDate).format(fm);
  // });
});

module.exports = router;
