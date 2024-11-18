const NhaxuatbanService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  try {
    const nhaxuatbanService = new NhaxuatbanService(await MongoDB.connect());
    const newNhaxuatban = await nhaxuatbanService.create(req.body);
    res.status(201).json({
      message: "New publisher created successfully!",
      nhaxuatbanId: newNhaxuatban,
    });
  } catch (error) {
    next(new ApiError(500, "An error occurred while creating the publisher"));
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const nhaxuatbanService = new NhaxuatbanService(await MongoDB.connect());
    const nhaxuatbans = await nhaxuatbanService.getAll();
    res.json(nhaxuatbans);
  } catch (error) {
    next(new ApiError(500, "An error occurred while retrieving publishers"));
  }
};

exports.getById = async (req, res, next) => {
  try {
    const nhaxuatbanService = new NhaxuatbanService(await MongoDB.connect());
    const nhaxuatban = await nhaxuatbanService.getById(req.params.id);

    if (!nhaxuatban) {
      return next(new ApiError(404, "Publisher not found"));
    }

    res.json(nhaxuatban);
  } catch (error) {
    next(new ApiError(500, "An error occurred while retrieving the publisher"));
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const nhaxuatbanService = new NhaxuatbanService(await MongoDB.connect());
    const updatedCount = await nhaxuatbanService.updateById(
      req.params.id,
      req.body
    );

    if (updatedCount === 0) {
      return next(new ApiError(404, "Publisher not found or no changes made"));
    }

    res.json({ message: "Publisher updated successfully!" });
  } catch (error) {
    next(new ApiError(500, "An error occurred while updating the publisher"));
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const nhaxuatbanService = new NhaxuatbanService(await MongoDB.connect());
    const deletedCount = await nhaxuatbanService.deleteById(req.params.id);

    if (deletedCount === 0) {
      return next(new ApiError(404, "Publisher not found"));
    }

    res.json({ message: "Publisher deleted successfully!" });
  } catch (error) {
    next(new ApiError(500, "An error occurred while deleting the publisher"));
  }
};
