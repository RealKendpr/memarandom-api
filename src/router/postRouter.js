require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { handleUpload } = require("../controllers/driveUpload");

const uploadRouter = express.Router();
const uploadFile = multer();

uploadRouter.post("/upload-done", uploadFile.any(), handleUpload);

module.exports = uploadRouter;
