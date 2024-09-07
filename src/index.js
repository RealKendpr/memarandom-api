const express = require("express");
const getRouter = require("./router/getRouter");
const uploadRouter = require("./router/uploadRouter");

const app = express();
const expressPORT = 1111;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getRouter);
app.use(uploadRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(expressPORT, () => {
  console.log("listening");
});
