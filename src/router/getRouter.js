const express = require("express");
const { readMeme } = require("../controllers/readMeme");

const getRouter = express.Router();

getRouter.get("/api-get", async (_, res) => {
  try {
    res.json(await readMeme());
  } catch (error) {
    console.log(error);
  }
});

module.exports = getRouter;
