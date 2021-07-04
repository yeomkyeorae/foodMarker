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
  choizaRoadId: {
    type: ObjectId,
    required: true,
    ref: "ChoizaRoad"
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
