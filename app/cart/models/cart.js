const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema({
  _id: String,
  userId: Number,
  date: String,
  time: String,
  products: Array,
});
module.exports = mongoose.model("cart", cartSchema, "carts");
