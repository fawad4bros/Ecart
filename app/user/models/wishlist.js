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
  isActive: {
    type: Boolean,
  },
});
const WishList = mongoose.model("wishlist", schema, "wishlist");
module.exports.WishList = WishList;
