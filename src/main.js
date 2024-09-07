const express = require("express");
const uploadRouter = require("./router/uploadRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("listening");
});
