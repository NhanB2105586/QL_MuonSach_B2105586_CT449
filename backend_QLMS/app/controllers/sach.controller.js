const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  try {
    const sachService = new SachService(await MongoDB.connect());
    const newSach = await sachService.create(req.body);
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

exports.updateById = async (req, res, next) => {
  try {
    const sachService = new SachService(await MongoDB.connect());
    const updatedCount = await sachService.updateById(req.params.id, req.body);

    if (updatedCount === 0) {
      return next(new ApiError(404, "Book not found or no changes made"));
    }

    res.json({ message: "Book updated successfully!" });
  } catch (error) {
    next(new ApiError(500, "An error occurred while updating the book"));
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

