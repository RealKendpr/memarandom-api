const { uploadToDrive } = require("../helpers/uploadToDrive");

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
