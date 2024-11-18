const express = require("express");
const theodoiController = require("../controllers/theodoi.controller");

const router = express.Router();

// Route thêm bản ghi theo dõi mới
router.post("/", theodoiController.create);

// Route lấy danh sách tất cả các bản ghi
router.get("/", theodoiController.getAll);

// Route lấy thông tin theo ID
router.get("/:id", theodoiController.getById);

// Route cập nhật bản ghi theo ID
router.put("/:id", theodoiController.updateById);

// Route xóa bản ghi theo ID
router.delete("/:id", theodoiController.deleteById);

module.exports = router;
