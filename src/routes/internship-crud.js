const express = require("express");
var router = express.Router();

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
  "/addAttachmentToSublistItemUnderInternship",
  upload.array("myFile", 5),
  async function (req, res, next) {
    const images = [];

    await req.files.map((item) => {
      images.push({ path: "/docs/" + item.filename });
    });

    const intern = await Internship.findOne({
      _id: req.body.internshipID,
    });
    var sublistIndex = intern.subList.findIndex(
      (item) => item._id.toString() === req.body.sublistItemID.toString()
    );

    images.map((item) => intern.subList[sublistIndex].attachments.push(item));

    intern
      .save()
      .then(() => res.json(images))
      .catch((err) => res.json(err));
  }
);

router.post("/getAllInternship", async function (req, res, next) {
  const intern = await Internship.find({});
  res.json(intern);
});

router.post("/addInternshipToOneStudent", async function (req, res, next) {
  const obj = req.body;
  const internship = new Internship(obj);

  internship.save().then((doc) => {
    res.json(doc);
  });
});

router.post("/updateInternshipToOneStudent", async function (req, res, next) {
  const obj = req.body;
  const intern = await Internship.findOne({
    _id: req.body.internshipID,
    studentID: req.body.studentID,
  });

  if (intern !== undefined && intern != null) {
    intern.title = req.body.title;
    intern.save().then((doc) => {
      res.json({ _id: intern._id, title: intern.title });
    });
  } else {
    res.json({ err: "intern not found" });
  }
});

router.post("/addSubListItemToOneInternship", async function (req, res, next) {
  const intern = await Internship.findOne({
    _id: req.body.internshipID,
    studentID: req.body.studentID,
  });

  if (intern !== undefined && intern != null) {
    var sl = intern.subList.push(req.body);
    intern.save().then((doc) => {
      res.json(intern.subList[sl - 1]);
    });
  } else {
    res.json({ err: "intern not found" });
  }
});

router.post(
  "/updateSubListItemToOneInternship",
  async function (req, res, next) {
    const intern = await Internship.findOne({
      _id: req.body.internshipID,
    });

    if (intern !== undefined && intern != null) {
      var sublistIndex = intern.subList.findIndex(
        (item) => item._id.toString() === req.body._id.toString()
      );
      intern.subList[sublistIndex] = req.body;
      const newSublist = intern.subList[sublistIndex];
      intern.save().then((doc) => res.json(newSublist));
    } else {
      res.json({ err: "intern not found" });
    }
  }
);

module.exports = router;
