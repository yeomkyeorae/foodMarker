const express = require("express");
const app = express();
const port = 5000;

const { User } = require("./models/User");
const { Restaurant } = require("./models/Restaurant");
const { WishList } = require("./models/WishList");
const { auth } = require("./middleware/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "16mb", extended: true })); // Make sure you add these two lines
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
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

// 테스트
app.get("/api/hello", (req, res) => {
  res.send("hello");
});

// singup
app.post("/api/users/signup", (req, res) => {
  // 회원가입할 떄 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣음
  const user = User(req.body);
  user.save((err, userInfo) => {
    if (err)
      return res.json({
        success: false,
        err
      });
    return res.status(200).json({
      success: true
    });
  });
});

// login
app.post("/api/users/login", (req, res) => {
  // 1. 요청된 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "no email!!!"
      });
    }
    // 2. 데이터베이스에 이메일이 있으면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "incorrect password!!!"
        });
      }
      // 3. 비밀번호가 맞다면 토큰을 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id
          });
      });
    });
  });
});

// auth
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  });
});

// logout
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

// get my restaurants
app.post("/api/restaurants", (req, res) => {
  const restaurants = Restaurant.find(
    { visitor: req.body.id },
    (err, restaurants) => {
      if (err) return res.json({ success: false, err });
      return res.json(restaurants);
    }
  );
});

// create my restaurant
app.post("/api/restaurant", (req, res) => {
  const restaurant = Restaurant(req.body);
  restaurant.save((err, restaurantInfo) => {
    if (err)
      return res.json({
        success: false,
        err
      });
    return res.status(200).json({
      success: true
    });
  });
});

// delete my restaurant
app.delete("/api/restaurant", (req, res) => {
  Restaurant.findOneAndRemove({ _id: req.query._id }, (err, restaurantInfo) => {
    if (err)
      return res.json({
        success: false,
        err
      });
    return res.status(200).json({
      success: true
    });
  });
});

// get my wishLists
app.post("/api/wishLists", (req, res) => {
  const wishLists = WishList.find({ user: req.body.id }, (err, wishLists) => {
    if (err) return res.json({ success: false, err });
    return res.json(wishLists);
  });
});

// create my wishList
app.post("/api/wishList", (req, res) => {
  const wishList = WishList(req.body);
  wishList.save((err, wishListInfo) => {
    if (err) {
      return res.json({
        success: false,
        err
      });
    }
    return res.status(200).json({
      success: true
    });
  });
});

// delete my wishList
app.delete("/api/wishList", (req, res) => {
  WishList.findOneAndRemove({ _id: req.query._id }, (err, wishListInfo) => {
    if (err)
      return res.json({
        success: false,
        err
      });
    return res.status(200).json({
      success: true
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${[port]}`);
});
