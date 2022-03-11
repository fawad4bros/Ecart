const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: String,
  userId: Number,
  date: String,
  time: String,
  products: Array,
});
const Cart = mongoose.model("Cart", schema);
module.exports.Cart = Cart;
