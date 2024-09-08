const express = require("express");
const getRouter = require("./router/getRouter");
const postRouter = require("./router/postRouter");

const app = express();
const expressPORT = 1111;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getRouter);
app.use(postRouter);

app.get("/upload", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(expressPORT, () => {
  console.log("listening to port: 1111");
});
