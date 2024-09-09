const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { getCollections } = require("../helpers/getCollections");

const loginController = async (req, res) => {
  // const hashedPassword = await bcrypt.hash('yourPasswordInString');
  // console.log("hased: " + hashedPassword);

  const { username, password } = req.body;

  try {
    const collection = await getCollections(process.env.LOGIN_COLLECTIONS);

    const userCredential = await collection.find().toArray();

    const verifyPass = await bcrypt.compare(
      password,
      userCredential[0].password
    );

    if (username === userCredential[0].username && verifyPass) {
      req.session.userid = await bcrypt.hash(username + uuidv4, 5);

      return res.status(200).redirect("/upload");
    } else return res.status(404).send("No records found");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loginController };
