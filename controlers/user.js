const User = require("../module/user");

const handle_erros = (err) => {
  console.log(err.message, err.code);
  const errors = { email: "", pass: "" };
  if (err.code === 11000) {
    errors.email = "the email is existed";
  }
  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
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
    let errors = handle_erros(err);
    res.status(400).json(errors);
  }
};

module.exports.post_login = async (req, res) => {
  const { email, pass } = req.body;
  console.log(email, pass);
  res.send("user login");
};
