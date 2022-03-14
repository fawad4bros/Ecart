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
  comment: {
    type: String,
  },
});
const comments = mongoose.model("comment", schema, "comments");
module.exports.Comments = comments;
