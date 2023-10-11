const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/userRouter");
const cookieparser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieparser());
// view engine
app.set("view engine", "ejs");
// database connection
const dbURI =
  "mongodb+srv://islam1234:test1234@nodeexpressprojects.ihvra5o.mongodb.net/JWT_NodeJS?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(3000, () => {
      console.log("connected");
    })
  )
  .catch((err) => console.log(err));
// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(router);
