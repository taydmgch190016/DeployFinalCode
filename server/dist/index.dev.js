"use strict";

var express = require("express");

var cors = require("cors");

var bodyParser = require("body-parser");

var jwt = require("jsonwebtoken");

var app = express();

var path = require("path");

require("dotenv").config(); // Sử dụng cors để cho phép cross-origin requests


app.use(cors({
  origin: ['https://web-theta-dusky-70.vercel.app', 'exp://192.168.70.131:8081'],
  credentials: true
}));
app.use(function (req, res, next) {
  console.log('Origin:', req.headers.origin);
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