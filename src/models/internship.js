const mongoose = require("mongoose");
const { Schema } = mongoose;

const attachmentsSchema = new Schema({
  path: String,
});

const subListSchema = new Schema({
  title: String,
  status: String,
  buttonsStatus: String,
  attachments: [attachmentsSchema],
});

const internshipSchema = new Schema({
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: { type: String },
  subList: [subListSchema],
});

module.exports = InternShip = mongoose.model("internship", internshipSchema);
