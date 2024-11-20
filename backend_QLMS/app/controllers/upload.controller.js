const multer = require("multer");
const path = require("path");

// Cấu hình Multer để lưu ảnh vào thư mục coverImages
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../coverImages")); // Thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Đặt tên file duy nhất
  },
});

const upload = multer({ storage });

// Middleware Multer xử lý upload
const uploadMiddleware = upload.single("AnhBia");

// API tải ảnh lên
exports.uploadCoverImage = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.error("Error while uploading file:", err);
      return res.status(500).json({ message: "Error uploading file." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file provided." });
    }

    console.log("Request received:", req.file);
    res.json({ url: `/coverImages/${req.file.filename}` });
  });
};
