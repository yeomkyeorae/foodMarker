const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;

const visitedChoizaRoadSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  restaurantName: {
    type: String,
    maxlength: 1000
  },
  season: {
    type: Number
  }
});

const VisitedChoizaRoad = mongoose.model(
  "VisitedChoizaRoad",
  visitedChoizaRoadSchema
);

module.exports = {
  VisitedChoizaRoad
};
