const express = require("express");
const getRouter = require("./router/getRouter");

const app = express();
const expressPORT = 1111;

app.use(getRouter);

app.listen(expressPORT, () => {
  console.log("listening");
});

//needs to be split into different files, modularize..
