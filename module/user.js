const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  pass: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
