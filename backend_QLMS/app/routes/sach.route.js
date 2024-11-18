const express = require("express");
const sachController = require("../controllers/sach.controller");

const router = express.Router();

// Route tạo sách mới
router.post("/", sachController.create);

// Route lấy danh sách tất cả sách
router.get("/", sachController.getAll);

// Route lấy thông tin sách theo ID
router.get("/:id", sachController.getById);

// Route cập nhật thông tin sách theo ID
router.put("/:id", sachController.updateById);

// Route xóa sách theo ID
router.delete("/:id", sachController.deleteById);

module.exports = router;

