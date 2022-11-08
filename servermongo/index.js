require("dotenv").config();
const path = require("path");
const express = require("express");
const upload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();

// internal imports
const {
  notFoundHandler,
  defaultErrorHandler
} = require("./middleware/errorHandler");

// database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Mongo is connected");
}).catch((err) => {
  console.log(err);
});

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
app.listen(process.env.PORT, () => {
  console.log(`Server is running port ${process.env.PORT}`);
});