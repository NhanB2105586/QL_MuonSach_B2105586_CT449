const TheodoiService = require("../services/theodoi.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  try {
    const theodoiService = new TheodoiService(await MongoDB.connect());
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
