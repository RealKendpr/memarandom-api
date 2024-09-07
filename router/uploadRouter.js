const express = require("express");
const stream = require("stream");
const multer = require("multer");
const path = require("path");
const googleapis = require("googleapis");

const uploadRouter = express.Router();
const uploadFile = multer();

const keyFile = path.join(__dirname + "./credential/creds.json");
const apiScope = ["https://www.googleapis.com/auth/drive"];

const authenticate = new googleapis.auth.GoogleAuth({
  keyFile: keyFile,
  scopes: apiScope,
});

module.exports = uploadRouter;
