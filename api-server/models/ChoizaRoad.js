const mongoose = require("mongoose");

const choizaRoadSchema = mongoose.Schema({
  thumbnailURL: {
    type: String,
    maxlength: 1000
  },
  youtubeURL: {
    type: String,
    maxlength: 1000
  }
});

const ChoizaRoad = mongoose.model("ChoizaRoad", choizaRoadSchema);

module.exports = {
  ChoizaRoad
};