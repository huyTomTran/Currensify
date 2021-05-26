const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  created: { type: Date, default: Date.now },
  isLoggedIn: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
