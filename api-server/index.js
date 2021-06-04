const express = require("express");
const app = express();
const port = 5000;

const { User } = require("./models/User");
const { Restaurant } = require("./models/Restaurant");
const { WishList } = require("./models/WishList");
const { ChoizaRoad } = require("./models/ChoizaRoad");
const { auth } = require("./middleware/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const config = require("./config/key");

app.use(bodyParser.json({ limit: "16mb", extended: true })); // Make sure you add these two lines
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/food", express.static("uploads"));

let gfs;

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((db, err) => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "images"
    });

    console.log("mongoDB connected!!!");
  })
  .catch(err => console.log(err));

try {
  fs.readdirSync("uploads/");
} catch (error) {
  console.log("uploads 폴더 생성");
  fs.mkdirSync("uploads/");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage }).single("restaurant_img");

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
          .cookie("x_auth", user.token, { maxAge: 1800000 })
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id,
            name: user.name
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
  const order = req.body.order;
  let sortMethod;
  if (order === 1) {
    sortMethod = { name: 1 }; // 가
  } else if (order === 2) {
    sortMethod = { name: -1 }; // 하
  } else if (order === 3) {
    sortMethod = { date: -1 }; // 최신
  } else if (order === 4) {
    sortMethod = { date: 1 }; // 옛날
  }

  const restaurants = Restaurant.find({ visitor: req.body.id })
    .sort(sortMethod)
    .skip((req.body.page - 1) * req.body.itemPerPage)
    .limit(req.body.itemPerPage);

  restaurants.exec((err, restaurants) => {
    if (err) return res.json({ success: false, err });
    return res.json(restaurants);
  });
});

// get my restaurants count
app.post("/api/restaurants/count", (req, res) => {
  const restaurants = Restaurant.countDocuments({ visitor: req.body.id });

  restaurants.exec((err, restaurants) => {
    if (err) return res.json({ success: false, err });
    return res.json(restaurants);
  });
});

// get restaurants without image
app.post("/api/restaurants-no-image", (req, res) => {
  const restaurants = Restaurant.find(
    { visitor: req.body.id },
    {
      _id: 1,
      visitor: 1,
      name: 1,
      address: 1,
      rating: 1
    }
  );

  const optionLocation = req.body.optionLocation;
  restaurants.exec((err, restaurants) => {
    if (err) return res.json({ success: false, err });

    if (optionLocation) {
      const filterdRestaurants = restaurants.filter(restaurant => {
        const frontAddress = restaurant.address.split(" ")[0];
        const slicedFrontAddress = frontAddress.slice(0, optionLocation.length);
        if (slicedFrontAddress === optionLocation) {
          return true;
        } else {
          return false;
        }
      });
      return res.json(filterdRestaurants);
    }
    return res.json(restaurants);
  });
});

// get my 5 stars restaurant latest
app.get("/api/restaurants/top5", (req, res) => {
  const userId = req.query._id;
  const body = { visitor: userId, rating: 5 };

  const restaurants = Restaurant.find(body)
    .sort({ date: -1 }) // 최신 먼저 고려
    .limit(5);

  restaurants.exec((err, restaurants) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ restaurants: restaurants });
  });
});

// get restaurant with the most count
app.get("/api/restaurant/most", (req, res) => {
  const restaurant = Restaurant.aggregate([
    {
      $group: {
        _id: {
          name: "$name",
          address: "$address"
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        count: -1
      }
    },
    {
      $limit: 1
    }
  ]);
  restaurant.exec((err, restaurant) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ restaurant: restaurant });
  });
});

// post img
app.post("/api/img", (req, res) => {
  const imgName = req.body.imgName;

  if (imgName) {
    const img = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
    const imgFullName = `uploads/${Date.now()}_${imgName}.jpeg`;
    const imgClientPath = `food/${Date.now()}_${imgName}.jpeg`;

    fs.writeFileSync(imgFullName, img, "base64", err => {
      return res.json({ success: false, err });
    });
    return res.json({ success: true, path: imgClientPath });
  } else {
    upload(req, res, err => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.json({ success: true, path: `food/` + res.req.file.filename });
    });
  }
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

// update my restaurant
app.put("/api/restaurant", (req, res) => {
  Restaurant.findById(req.body.restaurantId, (err, restaurant) => {
    restaurant.date = req.body.date;
    if (req.body.imgURL) {
      restaurant.imgURL = req.body.imgURL;
    }
    restaurant.rating = req.body.rating;
    restaurant.eatingTime = req.body.eatingTime;

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

// get 10 wishLists
app.get("/api/wishLists", (req, res) => {
  const body = {};

  const wishLists = WishList.find(body).limit(10);

  wishLists.exec((err, wishLists) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ wishLists: wishLists });
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

// get choizaRoads
app.get("/api/choizaRoads", (req, res) => {
  const season = req.query.season;
  const body = { season: Number(season) };

  const choizaRoads = ChoizaRoad.find(body).sort({ ep: 1 });

  choizaRoads.exec((err, choizaRoads) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ choizaRoads });
  });
});

// post choizaRoad
app.post("/api/choizaRoads", (req, res) => {
  const choizaRoad = ChoizaRoad(req.body);
  choizaRoad.save((err, userInfo) => {
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
