const express = require("express");
const nhaxuatbanController = require("../controllers/nhaxuatban.controller");

const router = express.Router();

// Route tạo nhà xuất bản mới
router.post("/", nhaxuatbanController.create);

// Route lấy danh sách tất cả nhà xuất bản
router.get("/", nhaxuatbanController.getAll);

// Route lấy thông tin nhà xuất bản theo ID
router.get("/:id", nhaxuatbanController.getById);

// Route cập nhật thông tin nhà xuất bản theo ID
router.put("/:id", nhaxuatbanController.updateById);

// Route xóa nhà xuất bản theo ID
router.delete("/:id", nhaxuatbanController.deleteById);

module.exports = router;
