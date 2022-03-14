const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: {
    type: Number,
  },
});
const rating = mongoose.model("rating", schema, "ratings");
module.exports.Rating = rating;
