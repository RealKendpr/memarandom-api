require("dotenv").config();
const express = require("express");
const stream = require("stream");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");

const uploadRouter = express.Router();
const uploadFile = multer();

const keyFile = path.join(__dirname, "../credentials/creds.json");
const apiScope = ["https://www.googleapis.com/auth/drive"];

const authenticate = new google.auth.GoogleAuth({
  keyFile: keyFile,
  scopes: apiScope,
});

const uploadToDrive = async (fileObj) => {
  const bufferStream = new stream.PassThrough().end(fileObj.buffer);
  const drive = google.drive({
    version: "v3",
    auth: authenticate,
  });

  const { data } = await drive.files.create({
    media: {
      mimeType: fileObj.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObj.originalName,
      parents: [process.env.DRIVE_PATH],
    },
    fields: "id,name",
  });

  await drive.permissions.create({
    fileId: data.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const fileLink = `https://drive.google.com/uc?id=${data.id}`;
  console.log(`Direct link to the file: ${fileLink}`);

  // console.log(`uploaded ${data.name}, ${data.id}`);
};

uploadRouter.post("/upload", uploadFile.any(), async (req, res) => {
  try {
    const { body, files } = req;
    for (let file = 0; file < files.length; file++) {
      await uploadToDrive(files[file]);
    }
    console.log(body);
    res.status(200).send("Done");
  } catch (file) {
    res.send(file.message);
  }
});

module.exports = uploadRouter;
