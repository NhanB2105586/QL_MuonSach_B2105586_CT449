const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const app = express();

const docgiaRoutes = require("./app/routes/docgia.route");
const nhaxuatbanRoutes = require("./app/routes/nhaxuatban.route");
const nhanvienRoutes = require("./app/routes/nhanvien.route");
const sachRoutes = require("./app/routes/sach.route");
const theodoiRoutes = require("./app/routes/theodoi.route"); // Import route TheoDoiMuonSach

// Cho phép các yêu cầu từ mọi nguồn
app.use(cors());

// Parse JSON
app.use(express.json());

// Route mặc định
app.get("/", (req, res) => {
  res.json({ message: "Welcome to library management system!" });
});

// Định nghĩa các route
app.use("/api/docgia", docgiaRoutes);
app.use("/api/nhaxuatban", nhaxuatbanRoutes);
app.use("/api/nhanvien", nhanvienRoutes);
app.use("/api/sach", sachRoutes);
app.use("/api/theodoi", theodoiRoutes); // Thêm route TheoDoiMuonSach

// Xử lý lỗi 404
app.use((req, res, next) => {
  next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
