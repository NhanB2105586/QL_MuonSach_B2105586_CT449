const express = require("express");
const docgiaController = require("../controllers/docgia.controller");

const router = express.Router();

// Route tạo độc giả mới
router.post("/", docgiaController.create);

// Route lấy danh sách tất cả độc giả
router.get("/", docgiaController.getAll);

// Route lấy thông tin độc giả theo ID
router.get("/:id", docgiaController.getById);

// Route cập nhật thông tin độc giả theo ID
router.put("/:id", docgiaController.updateById);

// Route xóa độc giả theo ID
router.delete("/:id", docgiaController.deleteById);

module.exports = router;
