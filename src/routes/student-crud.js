var express = require("express");
var router = express.Router();

const User = require("../models/user");

router.get("/add", async function (req, res, next) {
  const number = req.body.number;
  const name = req.body.name;
  const registerDate = req.body.registerDate;
  const email = req.body.email;
  const password = req.body.number;
  const role = "student";

  const student = new User({
    number: number,
    name: name,
    registerDate: registerDate,
    email: email,
    password: password,
    role: role,
  });

  const isStudentExist = await User.find({
    number: number,
  });

  if (isStudentExist.length > 0) {
    var id = isStudentExist[0]._id;
    var _id = id.toString();
    User.findByIdAndUpdate(
      { _id },
      { number: number, name: name, email: email, registerDate: registerDate },
      function (err, modal) {
        res.json(modal);
      }
    );
  } else {
    student
      .save()
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  }
});

router.get("/getAllStudents", async function (req, res, next) {
  const allstudents = await User.find(
    { role: "student" },
    "_id number name email registerDate"
  );
  res.json(allstudents);
});

module.exports = router;
