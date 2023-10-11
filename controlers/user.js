// const express = require("express");
const User = require("../module/user");
const Jwt = require("jsonwebtoken");

const handle_erros = (err) => {
  console.log(err.message, err.code);
  const errors = { email: "", pass: "" };
  if (err.code === 11000) {
    errors.email = "the email is existed";
  }
  if (err.message == "incorrect email") {
    errors.email = "email is not registered".toUpperCase();
  }
  else if (err.message == "incorrect pass") {
     errors.pass = "password is not registered".toUpperCase();
   }
  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
maxAge = 3 * 24 * 60 * 60;
const creatToken = (id) => {
  return Jwt.sign({ id }, "happy pizza", { expiresIn: maxAge });
};
module.exports.Get_login = (req, res) => {
  res.render("login");
};
module.exports.Get_SignUp = (req, res) => {
  res.render("signup");
};
module.exports.Get_logout = (req, res) => {
 res.cookie("Jwt","",{maxAge:1})
 res.redirect("/")
};
module.exports.post_signUp = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await User.create({ email, pass });
    const token = creatToken(user._id);
    res.cookie("Jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(201).json({ user: user._id });
  } catch (err) {
    let errors = handle_erros(err);
    res.status(400).json({ errors });
  }
};

module.exports.post_login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await User.login(email, pass);
    const token = creatToken(user._id);
    res.cookie("Jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handle_erros(err);
    res.status(400).json({ errors });
  }
};
