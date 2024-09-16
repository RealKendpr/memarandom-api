require("dotenv").config();
const express = require("express");

// I belive this way works as well and is less crowded if u prefer this u can delete your "router" folder
const router = require("./routes.js") // feel free delete this and keep your original code

// const getRouter = require("./router/getRouter");
// const uploadRouter = require("./router/postRouter");
// const loginRouter = require("./router/loginRouter");

const session = require("express-session");
const cors = require("cors");

const app = express();
const expressPORT = 1111;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 6,
    },
    resave: true,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

// app.use(getRouter);
// app.use(uploadRouter);
// app.use(loginRouter);

// app.get("/upload", (_, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/login", (req, res) => {
  if (req.session.userid) {
    res.redirect("/upload");
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.listen(expressPORT, () => {
  console.log(`Listening on Port: ${expressPORT}`);
});
