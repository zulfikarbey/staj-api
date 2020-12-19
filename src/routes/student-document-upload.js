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
    console.log(req.body);
    const intern = await Internship.findOne({
      _id: req.body.internshipID,
    });

    var sublistIndex = intern.subList.findIndex(
      (item) => item._id.toString() === req.body.sublistItemID.toString()
    );

    intern.subList[sublistIndex].attachments = [];
    intern.subList[sublistIndex].status = "beklemede";
    images.map((item) => intern.subList[sublistIndex].attachments.push(item));
    console.log(intern);
    intern
      .save()
      .then(() => {
        res.json(images);
      })
      .catch((err) => res.json(err));
  }
);

router.post("/list", async function (req, res, next) {
  const whoimI = await User.findOne({ email: req.user }, "_id");
  const internship = await Internship.find({ studentID: whoimI._id });

  res.json(internship);
});

module.exports = router;
