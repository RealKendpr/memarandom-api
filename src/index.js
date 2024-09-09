const express = require("express");
const getRouter = require("./router/getRouter");
const postRouter = require("./router/postRouter");
const loginRouter = require("./router/loginRouter");

const app = express();
const expressPORT = 1111;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getRouter);
app.use(postRouter);
app.use(loginRouter);

// app.get("/upload", (_, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/login", (_, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.listen(expressPORT, () => {
  console.log("listening to port: 1111");
});
