const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const { User } = require("./models/User");
const { Restaurant } = require("./models/Restaurant");
const { WishList } = require("./models/WishList");
const { ChoizaRoad } = require("./models/ChoizaRoad");
const { VisitedChoizaRoad } = require("./models/VisitedChoizaRoad");
const { auth } = require("./middleware/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: './.env'});

app.use(bodyParser.json({ limit: "16mb", extended: true })); // Make sure you add these two lines
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/food", express.static("uploads"));

// let gfs;

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((db, err) => {
    // gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    //   bucketName: "images"
    // });

    console.log("mongoDB connected!!!");
  })
  .catch(err => console.log(err));

let upload;
let uploadHeic;
let deleteImages;
// when deploy
if(process.env.NODE_ENV === 'production') {
  const multerS3 = require('multer-s3');
  const AWS = require('aws-sdk');

  AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'ap-northeast-2',
  });

  const s3 = new AWS.S3();

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'food-marker',
      key(req, file, cb) {
        //uploads 폴더를 만들고 그 곳에 넣는 것
        cb(null, `uploads/${Date.now()}_${file.originalname}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
  }).array("restaurant_jpeg_img", 10);

  uploadHeic = async (heicFile, fileName) => {
    const params = {
      Bucket: 'food-marker',
      Key: fileName,
      Body: heicFile,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    }
    
    try {
      const result = await s3.upload(params).promise();
      return result.Location;
    } catch(err) {
      console.log(err);
    }
  }

  deleteImages = async objectArr => {
    const params = {
      Bucket: "food-marker", 
      Delete: {
       Objects: objectArr, 
       Quiet: false
      }
     };

    try {
      const result = await s3.deleteObjects(params).promise();
      return result;
    } catch(err) {
      console.log(err);
    }
  }
  
// when dev
} else {
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
  
  upload = multer({ storage }).array("restaurant_jpeg_img", 10);
}

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
  } else if (order === 5) {
    sortMethod = { rating: -1 }; // 별점 높은 순
  } else if (order === 6) {
    sortMethod = { rating: 1 }; // 별점 낮은 순
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
app.get("/api/restaurants/count", (req, res) => {
  const id = req.query.id;
  const restaurants = Restaurant.countDocuments({ visitor: id });

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

// get 10 restaurants latest
app.get("/api/ten-restaurants", (req, res) => {
  const body = {};

  const restaurants = Restaurant.find(body)
    .sort({ date: -1 }) // 최신 먼저 고려
    .limit(10);

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

// post jpeg img
app.post("/api/img/jpeg", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    const fileNames = process.env.NODE_ENV === 'production' ? res.req.files.map(file => file.location.replace("/uploads", "/resized"))
      : res.req.files.map(file => `http://localhost:5000/food/` + file.filename);

    return res.json({ success: true, fileNames: fileNames });
  });
});

// post heic img
app.post("/api/img/heic", async (req, res) => {
  const images = req.body.images;
  const imageNames = req.body.imgNames;

  if(process.env.NODE_ENV === 'production') {
      try {
        const heicImagePaths = [];

        await Promise.all(imageNames.map(async (imageName, ix) => {
          const img = images[ix].replace(/^data:image\/jpeg;base64,/, "");
          const buf = Buffer.from(img, 'base64');
          const imgFullName = `resized/${Date.now()}_${imageName}.jpeg`;

          const imgClientPath = await uploadHeic(buf, imgFullName);
          heicImagePaths.push(imgClientPath);
        }))
        return res.json({ success: true, fileNames: heicImagePaths });
      } catch(err) {
        return res.json({ success: false, err });
      }
  } else {
    const heicImagePaths = [];

    imageNames.forEach((imageName, ix) => {
      const img = images[ix].replace(/^data:image\/jpeg;base64,/, "");
      const imgFullName = `uploads/${Date.now()}_${imageName}.jpeg`;
  
        const imgClientPath = `http://localhost:5000/food/${Date.now()}_${imageName}.jpeg`;
    
        heicImagePaths.push(imgClientPath);
        fs.writeFileSync(imgFullName, img, "base64", err => {
          return res.json({ success: false, err });
        });
    });
    return res.json({ success: true, fileNames: heicImagePaths });
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
      restaurant.imgURL = req.body.imgURL.join(',');
    }
    restaurant.rating = req.body.rating;
    restaurant.eatingTime = req.body.eatingTime;
    restaurant.menus = req.body.menus;

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
  Restaurant.findOneAndRemove({ _id: req.query._id }, async (err, restaurantInfo) => {
    if (err)
      return res.json({
        success: false,
        err
      });

    const restaurantImgURLs = restaurantInfo.imgURL.split(",");
    if(process.env.NODE_ENV === 'production') {
      try {
        const objectArr = restaurantImgURLs.map(url => {
          const splited = url.split('resized');
          const key = 'resized' + splited[splited.length - 1];
          return { Key: key }
        })
        const result = await deleteImages(objectArr);

        return res.json({ success: true });
      } catch(err) {
        return res.json({ success: false, err });
      }
    } else {
      try {
        restaurantImgURLs.forEach(url => {
          const filePath = "uploads/" + url.split("food/")[1];
          if (filePath) {
            fs.unlinkSync(filePath);
          }
        });
    
        return res.status(200).json({
          success: true
        });
      } catch(err) {
        return res.json({ success: false, err });
      }
    }
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

  const wishLists = WishList.find(body)
    .sort({ date: -1 })
    .limit(10);

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

// get my wishList count
app.get("/api/wishList/count", (req, res) => {
  const id = req.query.id;

  const wishList = WishList.countDocuments({ user: id });

  wishList.exec((err, wishList) => {
    if (err) return res.json({ success: false, err });
    return res.json(wishList);
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

// get visitedChoizaRoad
app.get("/api/visitedChoizaRoads", (req, res) => {
  const { userId, season } = req.query;

  const body = { userId, season: Number(season) };

  const visitedChoizaRoads = VisitedChoizaRoad.find(body);

  visitedChoizaRoads.exec((err, visitedChoizaRoads) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ visitedChoizaRoads });
  });
});

// post visitiedChoizaRoad
app.post("/api/visitedChoizaRoads", (req, res) => {
  const visitiedChoizaRoad = VisitedChoizaRoad(req.body);
  visitiedChoizaRoad.save((err, info) => {
    if (err)
      return res.json({
        success: false,
        err
      });
    return res.status(200).json({
      success: true,
      info
    });
  });
});

// delete visitedChoizaRoad
app.delete("/api/visitedChoizaRoads", (req, res) => {
  VisitedChoizaRoad.findOneAndRemove({ _id: req.query._id }, (err, info) => {
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


if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  });

  app.use(express.static(path.join(__dirname, 'client-app/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client-app/dist/index.html'));
  });
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${[port]}`);
});
