const User = require("../module/user");

module.exports.Get_login = (req, res) => {
  res.render("login");
};
module.exports.Get_SignUp = (req, res) => {
  res.render("signup");
};
module.exports.post_signUp = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await User.create({ email, pass });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("error,user not created");
  }
};

module.exports.post_login = async (req, res) => {
  const { email, pass } = req.body;
  console.log(email, pass);
  res.send("user login");
};
