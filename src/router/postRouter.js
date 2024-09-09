require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { handleUpload } = require("../controllers/driveUpload");
const path = require("path");

const uploadRouter = express.Router();
const uploadFile = multer();

const uploadPage = path.join(__dirname, "../index.html");

uploadRouter.post("/upload", uploadFile.any(), handleUpload);

uploadRouter.get("/upload", async (req, res) => {
  if (req.session.userid) {
    res.sendFile(uploadPage);
  } else res.redirect("/login");
});

module.exports = uploadRouter;
