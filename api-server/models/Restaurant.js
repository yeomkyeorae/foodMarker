const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const restaurantSchema = new Schema({
  visitor: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  username: {
    type: String,
    maxlength: 100
  },
  name: {
    type: String,
    maxlength: 100
  },
  address: {
    type: String,
    maxlength: 300
  },
  date: {
    type: String
  },
  imgURL: {
    type: String
  },
  rating: {
    type: Number
  },
  eatingTime: {
    type: Number
  },
  menus: {
    type: String
  },
  created: {
    type: String,
    maxlength: 300
  }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = {
  Restaurant
};
