const stream = require("stream");
const path = require("path");
const { google } = require("googleapis");
const { saveToDb } = require("../helpers/saveToDb");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const keyFile = path.join(__dirname, "../credentials/creds.json");
const apiScope = ["https://www.googleapis.com/auth/drive"];

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

const handleUpload = async (req, res) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];
  const maxSize = 2 * 1024 * 1024; //bytes

  try {
    const { body, files } = req;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (allowedMimeTypes.includes(file.mimetype) && file.size <= maxSize) {
        await uploadToDrive(file);
      } else {
        return res
          .status(400)
          .send(`File not allowed: ${file.size} bytes, ${file.mimetype}`);
      }
    }
    res.status(200).send("Done");
  } catch (file) {
    res.send(file.message);
  }
};

module.exports = { handleUpload };
