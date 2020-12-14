const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  number: { type: Number, required: true, unique: true },
  name: String,
  registerDate: Date,
  email: String,
  password: String,
  role: String,
});

module.exports = User = mongoose.model("user", userSchema);
