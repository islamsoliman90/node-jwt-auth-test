const Jwt = require("jsonwebtoken");
const User = require("../module/user");
const reqireAuth = (req, res, next) => {
  const token = req.cookies.Jwt;
  if (token) {
    Jwt.verify(token, "happy pizza", (err, decodedtoken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkuser = (req, res, next) => {
  const token = req.cookies.Jwt;
  if (token) {
    Jwt.verify(token, "happy pizza", async (err, decodedtoken) => {
      if (err) {
        next();
        res.locals.user=null
      } else {
        let user=await User.findById(decodedtoken.id)
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user= null
    next();
  }
};
module.exports = { reqireAuth,checkuser };
