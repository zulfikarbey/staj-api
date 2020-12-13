var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var stajekle = require("./routes/stajekle");

const authenticateToken = require("./utils/auth-control");
const adminControl = require("./utils/admin-control");

var app = express();

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/stajdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/stajekle", authenticateToken, adminControl, stajekle);

module.exports = app;
