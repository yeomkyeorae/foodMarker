const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const WishListSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    maxlength: 100
  },
  address: {
    type: String,
    maxlength: 300
  }
});

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = {
  WishList
};
