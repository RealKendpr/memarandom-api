const express = require("express");
const { loginController } = require("../controllers/loginContoller");

const loginRouter = express.Router();

loginRouter.post("/login", loginController);

module.exports = loginRouter;
