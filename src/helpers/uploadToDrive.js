const stream = require("stream");
// const path = require("path");
const { google } = require("googleapis");
const { saveToDb } = require("../helpers/saveToDb");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const keyFile = process.env.DRIVE_KEY_FILE;
const apiScope = ["https://www.googleapis.com/auth/drive"];

console.log(keyFile);

const authenticate = new google.auth.GoogleAuth({
  keyFile: keyFile,
  scopes: apiScope,
});

const drive = google.drive({
  version: "v3",
  auth: authenticate,
});

const uploadToDrive = async (fileObj) => {
  const webpObj = await sharp(fileObj.buffer).webp().toBuffer();
  const bufferStream = new stream.PassThrough().end(webpObj);

  const { data } = await drive.files.create({
    media: {
      mimeType: "image/webp",
      body: bufferStream,
    },
    requestBody: {
      name: `${uuidv4()}.webp`,
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
  await saveToDb(fileLink);
};

module.exports = { uploadToDrive };
