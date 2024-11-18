const DocgiaService = require("../services/docgia.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  try {
    const docgiaService = new DocgiaService(await MongoDB.connect());
    const newDocgia = await docgiaService.create(req.body);
    res.status(201).json({
      message: "New docgia created successfully!",
      docgiaId: newDocgia,
    });
  } catch (error) {
    next(new ApiError(500, "An error occurred while creating the docgia"));
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const docgiaService = new DocgiaService(await MongoDB.connect());
    const docgias = await docgiaService.getAll();
    console.log("Retrieved docgias:", docgias); // Thêm log kiểm tra
    res.json(docgias);
  } catch (error) {
    console.error("Error retrieving docgias:", error); // Log lỗi chi tiết
    next(new ApiError(500, "An error occurred while retrieving docgias"));
  }
};


exports.getById = async (req, res, next) => {
  try {
    const docgiaService = new DocgiaService(await MongoDB.connect());
    const docgia = await docgiaService.getById(req.params.id);

    if (!docgia) {
      return next(new ApiError(404, "Docgia not found"));
    }

    res.json(docgia);
  } catch (error) {
    next(new ApiError(500, "An error occurred while retrieving the docgia"));
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const docgiaService = new DocgiaService(await MongoDB.connect());
    const updatedCount = await docgiaService.updateById(
      req.params.id,
      req.body
    );

    if (updatedCount === 0) {
      return next(new ApiError(404, "Docgia not found or no changes made"));
    }

    res.json({ message: "Docgia updated successfully!" });
  } catch (error) {
    next(new ApiError(500, "An error occurred while updating the docgia"));
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const docgiaService = new DocgiaService(await MongoDB.connect());
    const deletedCount = await docgiaService.deleteById(req.params.id);

    if (deletedCount === 0) {
      return next(new ApiError(404, "Docgia not found"));
    }

    res.json({ message: "Docgia deleted successfully!" });
  } catch (error) {
    next(new ApiError(500, "An error occurred while deleting the docgia"));
  }
};
