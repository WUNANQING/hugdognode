const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//引入db和session和cors
const db = require(__dirname + "/_connect_db");
const session = require("express-session");
const cors = require("cors");
//引入router
const memberRouter = require("./routes/member");
const productsRouter = require("./routes/products");
const serviceUserRouter = require("./routes/serviceUser");
const knowledgeRouter= require("./routes/knowledge");

const app = express();

//設定session的middleware;
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "hugdog",
    cookie: { maxAge: 1200000 }
  })
);
//設定白名單
const whitelist = ["http://127.0.0.1:5500", "http://localhost:3000", undefined];
//cors跨源共用,讓個分頁都是享有相同cookie
const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    console.log("origin", origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
};
app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//將模組化的路由當成middleware
app.use("/member", memberRouter);
app.use("/products", productsRouter);
app.use("/service_user", serviceUserRouter);
app.use("/knowledge", knowledgeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
