const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 20
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    maxlength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

// 비밀번호 암호화
userSchema.pre("save", function(next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

// plain 비밀번호와 암호화된 비밀번호를 비교해 같은지 체크
userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// jsonwebtoken을 활용해서 token 생성하기
userSchema.methods.generateToken = function(cb) {
  let user = this;

  let token = jwt.sign(user._id.toHexString(), "thisIsSecretToken");
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
