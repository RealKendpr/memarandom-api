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

uploadRouter.post("/upload", uploadFile.any(), async (res, req) => {
  try {
    const { body, files } = req;
    for (let file = 0; f < files.length; file++) {
      await uploadFile(files[file]);
    }
    console.log(body);
    res.status(200).send("Done");
  } catch (file) {
    res.send(file.message);
  }
});

module.exports = uploadRouter;
