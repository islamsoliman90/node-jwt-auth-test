const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcript = require("bcrypt");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Is Required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Faild Email Validation"],
  },
  pass: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "Password Must be Atleast 6 Letter "],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcript.genSalt();
  this.pass = await bcript.hash(this.pass, salt);
  next();
});
UserSchema.statics.login = async function (email, pass) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcript.compare(pass, user.pass);
    if (auth) {
      return user;
    }
    throw Error("incorrect pass");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
