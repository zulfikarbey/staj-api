const express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;

const Internship = require("../models/internship");
const User = require("../models/user");

router.get("/addToOneStudent", async function (req, res, next) {
  const obj = req.body;

  const internship = new Internship(obj);

  internship.save().then((doc) => {
    res.send(doc);
  });
});

router.post("/push", async function (req, res, next) {
  const intern = await Internship.find({ _id: "5fd7b62f10cfed2f83252b9f" });

  intern[0].subList.push({ name: "harun" });

  intern[0].save().then((doc) => res.send(doc));
});

module.exports = router;
