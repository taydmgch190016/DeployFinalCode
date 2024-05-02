"use strict";

var express = require("express");

var cors = require("cors");

var bodyParser = require("body-parser");

var jwt = require("jsonwebtoken");

var app = express();

var path = require("path");

require("dotenv").config(); // Sử dụng cors để cho phép cross-origin requests
// app.use(
//   cors({
//     origin: ['https://web-theta-dusky-70.vercel.app', 'exp://192.168.70.131:8081'], 
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://web-theta-dusky-70.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true); //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.

  res.setHeader("Access-Control-Max-Age", 7200);
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
})); // Sử dụng express.json() thay vì body-parser

app.use(express.json()); // Kết nối đến MongoDB

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI).then(function () {
  console.log("Connected to MongoDB");
})["catch"](function (err) {
  return console.error(err);
}); // Sử dụng các routes

app.use("/api/auth", require("./routes/web/authRoutes"));
app.use("/api/products", require("./routes/web/products"));
app.use("/api/categories", require("./routes/web/categories"));
app.use("/api/client/auth", require("./routes/mobile/clientAuthRoutes"));
app.use("/api/client/stores", require("./routes/storeRoutes"));
app.use("/api/client/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/mobile/orderRoutes"));
app.use("/api/customers", require("./routes/mobile/customerRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes")); // Middleware xử lý request không được xử lý

app.use(function (req, res, next) {
  var error = new Error("Not found");
  error.status = 404;
  next(error);
}); // Middleware xử lý lỗi chung

app.use(function (error, req, res, next) {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
}); // Khởi động server

app.listen(process.env.PORT, function () {
  console.log("".concat(process.env.PORT));
});