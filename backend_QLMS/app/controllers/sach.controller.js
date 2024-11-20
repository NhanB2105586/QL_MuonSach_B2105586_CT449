const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


// API thêm sách (bao gồm lưu đường dẫn ảnh)
exports.create = async (req, res, next) => {
  try {
    const sachService = new SachService(await MongoDB.connect());

    // Lấy đường dẫn ảnh nếu có
    const AnhBia = req.file ? `/coverImages/${req.file.filename}` : "DefaultURL";

    // Dữ liệu sách từ body + đường dẫn ảnh
    const bookData = { ...req.body, AnhBia };

    const newSach = await sachService.create(bookData);
    res.status(201).json({
      message: "New book created successfully!",
      sachId: newSach,
    });
  } catch (error) {
    next(new ApiError(500, "An error occurred while creating the book"));
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const sachService = new SachService(await MongoDB.connect());
    const sachs = await sachService.getAll();
    res.json(sachs);
  } catch (error) {
    next(new ApiError(500, "An error occurred while retrieving books"));
  }
};

exports.getById = async (req, res, next) => {
  try {
    const sachService = new SachService(await MongoDB.connect());
    const sach = await sachService.getById(req.params.id);

    if (!sach) {
      return next(new ApiError(404, "Book not found"));
    }

    res.json(sach);
  } catch (error) {
    next(new ApiError(500, "An error occurred while retrieving the book"));
  }
};
const { ObjectId } = require("mongodb");

exports.updateById = async (req, res, next) => {
  try {
    const sachService = new SachService(await MongoDB.connect());
    const id = req.params.id;

    // Kiểm tra định dạng ID
    if (!ObjectId.isValid(id)) {
      console.error("ID không hợp lệ:", id);
      return next(new ApiError(400, "ID không hợp lệ"));
    }

    const updateData = req.body;
    console.log("Dữ liệu cập nhật:", updateData);

    const updatedCount = await sachService.updateById(new ObjectId(id), updateData);

    if (updatedCount === 0) {
      return next(new ApiError(404, "Không tìm thấy sách hoặc không có thay đổi"));
    }

    res.json({ message: "Cập nhật sách thành công!" });
  } catch (error) {
    console.error("Lỗi khi cập nhật sách:", error);
    next(new ApiError(500, "Đã xảy ra lỗi khi cập nhật sách"));
  }
};


exports.deleteById = async (req, res, next) => {
  try {
    const sachService = new SachService(await MongoDB.connect());
    const deletedCount = await sachService.deleteById(req.params.id);

    if (deletedCount === 0) {
      return next(new ApiError(404, "Book not found"));
    }

    res.json({ message: "Book deleted successfully!" });
  } catch (error) {
    next(new ApiError(500, "An error occurred while deleting the book"));
  }
};

