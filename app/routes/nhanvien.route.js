const express = require("express");
const nhanvienController = require("../controllers/nhanvien.controller");

const router = express.Router();

// Route tạo nhân viên mới
router.post("/", nhanvienController.create);

// Route lấy danh sách tất cả nhân viên
router.get("/", nhanvienController.getAll);

// Route lấy thông tin nhân viên theo ID
router.get("/:id", nhanvienController.getById);

// Route cập nhật thông tin nhân viên theo ID
router.put("/:id", nhanvienController.updateById);

// Route xóa nhân viên theo ID
router.delete("/:id", nhanvienController.deleteById);

module.exports = router;

