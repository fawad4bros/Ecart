const mongoose = require("mongoose");
const productSubSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
    },
  },
  { _id: false }
);
const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  products: [productSubSchema],
});

const Cart = mongoose.model("Cart", schema);
module.exports.Cart = Cart;
