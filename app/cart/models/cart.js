const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  products: {
    type: Array,
  },
});

const Cart = mongoose.model("Cart", schema);
module.exports.Cart = Cart;
