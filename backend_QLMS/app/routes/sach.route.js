const express = require("express");
const sachController = require("../controllers/sach.controller");

const router = express.Router();

// Route thêm sách mới (bao gồm upload ảnh bìa)
router.post("/", sachController.create);

// Route lấy danh sách tất cả sách
router.get("/", sachController.getAll);

// Route lấy thông tin sách theo ID
router.get("/:id", sachController.getById);

// Route cập nhật thông tin sách (bao gồm upload ảnh bìa mới)
router.put("/:id",sachController.updateById);

// Route xóa sách theo ID
router.delete("/:id", sachController.deleteById);

module.exports = router;
