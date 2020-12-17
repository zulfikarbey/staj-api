const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Internship = require("../models/internship");

multer = require("multer");

var storage = multer.diskStorage({
  destination: "src/public/docs/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.array("myFile", 5),
  async function (req, res, next) {
    const images = [];

    await req.files.map((item) => {
      images.push({ path: "/docs/" + item.filename });
    });

//veritabanına kaydedecez resim pathlarini
    res.json(images);
  }
);

router.post("/list", async function (req, res, next) {
  const whoimI = await User.findOne({ email: req.user }, "_id");
  const internship = await Internship.find({ studentID: whoimI._id });

  res.json(internship);
});

module.exports = router;
