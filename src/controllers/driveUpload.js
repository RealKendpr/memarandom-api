const stream = require("stream");
const path = require("path");
const { google } = require("googleapis");
const { saveToDb } = require("../helpers/saveToDb");

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
  const bufferStream = new stream.PassThrough().end(fileObj.buffer);

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

  await saveToDb(fileLink);
};

const handleUpload = async (req, res) => {
  try {
    const { body, files } = req;
    for (let file = 0; file < files.length; file++) {
      await uploadToDrive(files[file]);
    }
    res.status(200).send("Done");
  } catch (file) {
    res.send(file.message);
  }
};

module.exports = { handleUpload };
