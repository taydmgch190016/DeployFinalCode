const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
require("dotenv").config();

app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  next();
});
app.use(
  cors({
    origin: ['https://final-web-ten.vercel.app', 'exp://192.168.70.131:8081'], 
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
// Sử dụng express.json() thay vì body-parser
app.use(express.json());

// Kết nối đến MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

// Sử dụng các routes
app.use("/api/auth", require("./routes/web/authRoutes"));
app.use("/api/products", require("./routes/web/products"));
app.use("/api/categories", require("./routes/web/categories"));
app.use("/api/client/auth", require("./routes/mobile/clientAuthRoutes"));
app.use("/api/client/stores", require("./routes/storeRoutes"));
app.use("/api/client/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/mobile/orderRoutes"));
app.use("/api/customers", require("./routes/mobile/customerRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));

// Middleware xử lý request không được xử lý
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Middleware xử lý lỗi chung
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

// Khởi động server
app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}`);
});
