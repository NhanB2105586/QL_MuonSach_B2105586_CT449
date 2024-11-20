const TheodoiService = require("../services/theodoi.service");
const SachService = require("../services/sach.service"); 
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  try {
    const theodoiService = new TheodoiService(await MongoDB.connect());
    const sachService = new SachService(await MongoDB.connect());
    const { MaSach } = req.body; // Lấy MaSach từ dữ liệu mượn sách
    const sach = await sachService.getByMaSach(MaSach);
    if (!sach) {
      return next(new ApiError(404, "Sách không tồn tại"));
    }
    if (sach.SoQuyen <= 0) {
      return next(new ApiError(400, "Không còn sách để mượn"));
    }

    sach.SoQuyen -= 1; // Giảm số lượng sách đi 1
    await sachService.updateById(sach._id, { SoQuyen: sach.SoQuyen }); // Cập nhật số lượng sách trong data
    
    const newTheodoi = await theodoiService.create(req.body);
    res.status(201).json({
      message: "New borrowing record created successfully!",
      theodoiId: newTheodoi,
    });
  } catch (error) {
    next(
      new ApiError(500, "An error occurred while creating the borrowing record")
    );
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const theodoiService = new TheodoiService(await MongoDB.connect());
    const theodois = await theodoiService.getAll();
    res.json(theodois);
  } catch (error) {
    next(
      new ApiError(500, "An error occurred while retrieving borrowing records")
    );
  }
};

exports.getById = async (req, res, next) => {
  try {
    const theodoiService = new TheodoiService(await MongoDB.connect());
    const theodoi = await theodoiService.getById(req.params.id);

    if (!theodoi) {
      return next(new ApiError(404, "Borrowing record not found"));
    }

    res.json(theodoi);
  } catch (error) {
    next(
      new ApiError(
        500,
        "An error occurred while retrieving the borrowing record"
      )
    );
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const theodoiService = new TheodoiService(await MongoDB.connect());
    const updatedCount = await theodoiService.updateById(
      req.params.id,
      req.body
    );

    if (updatedCount === 0) {
      return next(
        new ApiError(404, "Borrowing record not found or no changes made")
      );
    }

    res.json({ message: "Borrowing record updated successfully!" });
  } catch (error) {
    next(
      new ApiError(500, "An error occurred while updating the borrowing record")
    );
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const theodoiService = new TheodoiService(await MongoDB.connect());
    const deletedCount = await theodoiService.deleteById(req.params.id);

    if (deletedCount === 0) {
      return next(new ApiError(404, "Borrowing record not found"));
    }

    res.json({ message: "Borrowing record deleted successfully!" });
  } catch (error) {
    next(
      new ApiError(500, "An error occurred while deleting the borrowing record")
    );
  }
};
exports.getByMaDocGia = async (req, res, next) => {
  try {
    const maDocGia = req.params.maDocGia;
    console.log("maDocGia received:", maDocGia);

    if (!maDocGia) {
      return next(new ApiError(400, "maDocGia is required"));
    }

    const theodoiService = new TheodoiService(await MongoDB.connect());
    const theodois = await theodoiService.getByMaDocGia(maDocGia);

    console.log("Borrowing records found:", theodois);

    if (!theodois || theodois.length === 0) {
      return next(
        new ApiError(404, "No borrowing records found for this reader")
      );
    }

    res.json(theodois);
  } catch (error) {
    console.error("Error occurred:", error);
    next(
      new ApiError(500, "An error occurred while retrieving borrowing records")
    );
  }
};
