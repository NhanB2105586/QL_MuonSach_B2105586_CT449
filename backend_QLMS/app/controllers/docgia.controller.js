const DocgiaService = require("../services/docgia.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const jwt = require("jsonwebtoken");

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

    // Lấy danh sách đã sắp xếp từ service
    const docgias = await docgiaService.getAll();

    console.log("Retrieved sorted docgias:", docgias); // Log danh sách đã sắp xếp
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
}

exports.checkMaDocGia = async (req, res, next) => {
  try {
    const docgiaService = new DocgiaService(await MongoDB.connect());
    const exists = await docgiaService.checkMaDocGia(req.params.maDocGia);
    res.json({ exists });
  } catch (error) {
    next(new ApiError(500, "An error occurred while checking MaDocGia"));
  }



};


exports.register = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body); // Log payload gửi từ frontend

    const docgiaService = new DocgiaService(await MongoDB.connect());

    const exists = await docgiaService.checkMaDocGia(req.body.MaDocGia);
    if (exists) {
      return res.status(400).json({ message: "MaDocGia already exists" });
    }

    const newDocgia = await docgiaService.create(req.body);
    res.status(201).json({
      message: "Registration successful!",
      docgiaId: newDocgia,
    });
  } catch (error) {
    console.error("Error during registration:", error); // Log lỗi chi tiết
    next(new ApiError(500, "An error occurred during registration"));
  }
};
exports.login = async (req, res, next) => {
  try {
    const docgiaService = new DocgiaService(await MongoDB.connect());

    // Xác thực thông tin đăng nhập
    const user = await docgiaService.authenticate(
      req.body.MaDocGia,
      req.body.Password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Tạo token
    const token = jwt.sign(
      { maDocGia: user.MaDocGia },
      "your-secret-key", // Thay bằng secret key thực tế
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful!",
      token: token,
      user: {
        name: `${user.HoLot} ${user.Ten}`, // Trả về họ và tên đầy đủ
        maDocGia: user.MaDocGia,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(new ApiError(500, "An error occurred during login"));
  }
};
