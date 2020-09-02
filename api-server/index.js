const express = require("express");
const app = express();
const port = 5000;

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("mongoDB connected!!!"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${[port]}`);
});
