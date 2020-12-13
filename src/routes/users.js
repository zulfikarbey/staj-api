var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

var User = require("../models/user");

router.get("/signup", async function (req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.query.password, salt);

  const user = new User({
    number: req.query.number,
    name: req.query.name,
    password: hash,
    email: req.query.email,
    role: req.query.role,
    registerDate: new Date(req.query.registerDate).toString(),
  });

  user.save().then(() => res.json(user));
});

router.get("/signin", async function (req, res, next) {
  try {
    const user = { email: req.query.email, password: req.query.password };
    const isUserExist = await User.find({ email: user.email });

    if (isUserExist.length !== 0) {
      const isPasswordMatch = await bcrypt.compare(
        user.password,
        isUserExist[0].password
      );
      if (isPasswordMatch) {
        res.send({
          token: generateAccessToken(isUserExist[0].email, isUserExist[0].role),
          role: isUserExist[0].role,
          email: isUserExist[0].email,
        });
      } else {
        res.json("User Password Not Match");
      }
    } else {
      res.json("User Not Found");
    }
  } catch (err) {
    res.send(err);
  }
});

function generateAccessToken(username, role) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username + "__" + role, "çokgizlibişeyler");
}

module.exports = router;
