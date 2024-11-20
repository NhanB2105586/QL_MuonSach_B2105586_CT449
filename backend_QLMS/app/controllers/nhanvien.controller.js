const NhanvienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const jwt = require("jsonwebtoken"); // Thêm jwt vào để tạo token

exports.create = async (req, res, next) => {
  try {
    const nhanvienService = new NhanvienService(await MongoDB.connect());
    const newNhanvien = await nhanvienService.create(req.body);
    res.status(201).json({
      message: "New employee created successfully!",
      nhanvienId: newNhanvien,
    });
  } catch (error) {
    next(new ApiError(500, "An error occurred while creating the employee"));
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const nhanvienService = new NhanvienService(await MongoDB.connect());
    const nhanviens = await nhanvienService.getAll();
    res.json(nhanviens);
  } catch (error) {
    next(new ApiError(500, "An error occurred while retrieving employees"));
  }
};

exports.getById = async (req, res, next) => {
  try {
    const nhanvienService = new NhanvienService(await MongoDB.connect());
    const nhanvien = await nhanvienService.getById(req.params.id);

    if (!nhanvien) {
      return next(new ApiError(404, "Employee not found"));
    }

    res.json(nhanvien);
  } catch (error) {
    next(new ApiError(500, "An error occurred while retrieving the employee"));
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const nhanvienService = new NhanvienService(await MongoDB.connect());
    const updatedCount = await nhanvienService.updateById(
      req.params.id,
      req.body
    );

    if (updatedCount === 0) {
      return next(new ApiError(404, "Employee not found or no changes made"));
    }

    res.json({ message: "Employee updated successfully!" });
  } catch (error) {
    next(new ApiError(500, "An error occurred while updating the employee"));
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const nhanvienService = new NhanvienService(await MongoDB.connect());
    const deletedCount = await nhanvienService.deleteById(req.params.id);

    if (deletedCount === 0) {
      return next(new ApiError(404, "Employee not found"));
    }

    res.json({ message: "Employee deleted successfully!" });
  } catch (error) {
    next(new ApiError(500, "An error occurred while deleting the employee"));
  }
};
exports.login = async (req, res, next) => {
  try {
    const nhanVienService = new NhanvienService(await MongoDB.connect());

    // Xác thực thông tin đăng nhập
    const user = await nhanVienService.authenticate(
      req.body.MSNV,
      req.body.Password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Tạo token sử dụng jwt
    const token = jwt.sign(
      {
        id: user._id, // Mã hóa ID nhân viên
        role: "nhanvien", // Thêm thông tin vai trò
      },
      "your_secret_key", // Secret key (nên lưu vào file .env để bảo mật)
      { expiresIn: "1h" } // Token có thời hạn 1 giờ
    );

    // Trả về phản hồi bao gồm token
    res.json({
      message: "Login successful!",
      token, // Trả về token cho frontend
      user: {
        MSNV: user.MSNV,
        HoTenNV: user.HoTenNV,
      },
    });
  } catch (error) {
    console.error("Error details in login:", error); // Log chi tiết lỗi
    next(new ApiError(500, "An error occurred during login"));
  }
};
