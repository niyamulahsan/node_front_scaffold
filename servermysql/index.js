require("dotenv").config();
const path = require("path");
const express = require("express");
const upload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const app = express();

// internal imports
const {
  notFoundHandler,
  defaultErrorHandler
} = require("./middleware/errorHandler");

// request handler
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// cors issue
app.use(cors());

// cookie handle
app.use(cookieParser());

// router setup
app.use("/api/user", require("./router/user.router"));

// file upload
app.use(upload());

// set static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// error handler
app.use(notFoundHandler);
app.use(defaultErrorHandler);

// server run
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running http://localhost:${process.env.PORT}`);
  });
})