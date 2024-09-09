const connect = require("../database/database");
const express = require("express");
const path = require("path");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");

const loginPage = path.join(__dirname, "../index.html");

loginRouter.post("/upload", async (req, res) => {
  // const hashedPass = await bcrypt.hash(req.body.password);
  let mongoClient;

  try {
    // console.log("hased: " + hashedPass);
    mongoClient = await connect();

    const collection = mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.LOGIN_COLLECTIONS);

    const userCredential = await collection.find().toArray();

    console.log(userCredential[0]);

    return res.status(200).sendFile(loginPage);
  } catch (error) {
    console.error(error);
  }
});

module.exports = loginRouter;
