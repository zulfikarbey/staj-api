var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt");

const User = require("../models/user");






router.post("/add", async function (req, res, next) {
  const updateID = req.body._id;
  const number = req.body.number;
  const name = req.body.name;
  const registerDate = req.body.registerDate;
  const email = req.body.email;

  const isStudentExist = await User.find({
    _id: updateID,
  });

  if (isStudentExist.length > 0) {
    var id = isStudentExist[0]._id;
    var _id = id.toString();
    User.findByIdAndUpdate(
      { _id },
      { number: number, name: name, email: email, registerDate: registerDate },
      { new: true },
      function (err, modal) {
        res.json(modal);
      }
    );
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.number, salt);
    const password = hash;
    const role = "student";

    const student = new User({
      number: number,
      name: name,
      registerDate: registerDate,
      email: email,
      password: password,
      role: role,
    });
    student
      .save()
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  }
});

router.post("/getAllStudents", async function (req, res, next) {
  const allstudents = await User.find(
    { role: "student" },
    "_id number name email registerDate"
  );
  res.json(allstudents);
});

module.exports = router;
