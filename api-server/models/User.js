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

userSchema.pre("save", function(next) {
  // 비밀번호 암호화
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
