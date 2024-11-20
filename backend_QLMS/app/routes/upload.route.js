const express = require("express");
const uploadCoverImage  = require("../controllers/upload.controller");
const router = express.Router();

router.post("/", uploadCoverImage.uploadCoverImage);

module.exports = router;
