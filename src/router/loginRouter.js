const connect = require("../database/database");
const express = require("express");
const path = require("path");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");

const uploadPage = path.join(__dirname, "../index.html");

loginRouter.post("/upload", async (req, res) => {
  // const hashedPassword = await bcrypt.hash('yourPasswordInString');
  // console.log("hased: " + hashedPassword);

  let mongoClient;
  const { username, password } = req.body;

  try {
    mongoClient = await connect();

    const collection = mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.LOGIN_COLLECTIONS);

    const userCredential = await collection.find().toArray();

    const verifyPass = await bcrypt.compare(
      password,
      userCredential[0].password
    );

    if (username === userCredential[0].username && verifyPass) {
      return res.status(200).sendFile(uploadPage);
    } else return res.status(404).send("No records found");
  } catch (error) {
    console.error(error);
  }
});

module.exports = loginRouter;
